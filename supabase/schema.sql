-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  provider TEXT NOT NULL DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create houses table
CREATE TABLE public.houses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  invite_code TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'base64'),
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create house_members table
CREATE TABLE public.house_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID REFERENCES public.houses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(house_id, user_id)
);

-- Create chores table
CREATE TABLE public.chores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID REFERENCES public.houses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  ticket_reward INTEGER NOT NULL DEFAULT 1,
  difficulty TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  house_id UUID REFERENCES public.houses(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('chore_completion', 'bonus', 'redemption')),
  source_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  house_id UUID REFERENCES public.houses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  cost INTEGER NOT NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reward_redemptions table
CREATE TABLE public.reward_redemptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reward_id UUID REFERENCES public.rewards(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  house_id UUID REFERENCES public.houses(id) ON DELETE CASCADE NOT NULL,
  cost INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.house_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read and update their own profile
CREATE POLICY "Users can read own profile" ON public.users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users 
  FOR UPDATE USING (auth.uid() = id);

-- House members can read house info and other members
CREATE POLICY "House members can read house" ON public.houses 
  FOR SELECT USING (
    id IN (
      SELECT house_id FROM public.house_members 
      WHERE user_id = auth.uid()
    )
  );

-- House members can read other house members
CREATE POLICY "House members can read members" ON public.house_members 
  FOR SELECT USING (
    house_id IN (
      SELECT house_id FROM public.house_members 
      WHERE user_id = auth.uid()
    )
  );

-- House members can read and create chores
CREATE POLICY "House members can read chores" ON public.chores 
  FOR SELECT USING (
    house_id IN (
      SELECT house_id FROM public.house_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "House members can create chores" ON public.chores 
  FOR INSERT WITH CHECK (
    house_id IN (
      SELECT house_id FROM public.house_members 
      WHERE user_id = auth.uid()
    )
  );

-- Users can update chores they created or are assigned to
CREATE POLICY "Users can update own chores" ON public.chores 
  FOR UPDATE USING (
    created_by = auth.uid() OR assigned_to = auth.uid()
  );

-- House members can read tickets and rewards
CREATE POLICY "House members can read tickets" ON public.tickets 
  FOR SELECT USING (
    house_id IN (
      SELECT house_id FROM public.house_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "House members can read rewards" ON public.rewards 
  FOR SELECT USING (
    house_id IN (
      SELECT house_id FROM public.house_members 
      WHERE user_id = auth.uid()
    )
  );

-- Functions and Triggers
-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url, provider)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_app_meta_data->>'provider', 'email')
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger to create user profile on signup
CREATE trigger on_auth_user_created
  AFTER insert ON auth.users
  FOR each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE trigger handle_updated_at BEFORE UPDATE ON public.users
  FOR each row execute procedure public.handle_updated_at();

CREATE trigger handle_updated_at BEFORE UPDATE ON public.houses
  FOR each row execute procedure public.handle_updated_at();

CREATE trigger handle_updated_at BEFORE UPDATE ON public.chores
  FOR each row execute procedure public.handle_updated_at();

CREATE trigger handle_updated_at BEFORE UPDATE ON public.rewards
  FOR each row execute procedure public.handle_updated_at();

CREATE trigger handle_updated_at BEFORE UPDATE ON public.reward_redemptions
  FOR each row execute procedure public.handle_updated_at();
