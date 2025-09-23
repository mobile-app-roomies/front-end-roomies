import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Cross-platform storage adapter
const createStorageAdapter = () => {
  if (Platform.OS === 'web') {
    // Web platform - use localStorage
    return {
      getItem: (key: string) => {
        if (typeof window !== 'undefined') {
          return Promise.resolve(window.localStorage.getItem(key));
        }
        return Promise.resolve(null);
      },
      setItem: (key: string, value: string) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value);
        }
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
        }
        return Promise.resolve();
      },
    };
  } else {
    // Native platform - use SecureStore
    return {
      getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
      },
      setItem: (key: string, value: string) => {
        return SecureStore.setItemAsync(key, value);
      },
      removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key);
      },
    };
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: Platform.OS === 'web',
  },
});

// Database types for TypeScript
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  provider: 'google' | 'github' | 'email';
  created_at: string;
  updated_at: string;
}

export interface House {
  id: string;
  name: string;
  invite_code: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface HouseMember {
  id: string;
  house_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface Chore {
  id: string;
  house_id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  created_by: string;
  due_date?: string;
  completed_at?: string;
  ticket_reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  user_id: string;
  house_id: string;
  amount: number;
  source: 'chore_completion' | 'bonus' | 'redemption';
  source_id?: string;
  created_at: string;
}

export interface Reward {
  id: string;
  house_id: string;
  title: string;
  description?: string;
  cost: number;
  created_by: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RewardRedemption {
  id: string;
  reward_id: string;
  user_id: string;
  house_id: string;
  cost: number;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}
