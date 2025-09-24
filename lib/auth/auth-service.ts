import { supabase } from '@/lib/supabase';

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  requiresEmailVerification?: boolean;
}

export class AuthService {
  /**
   * Sign in with email and password
   */
  static async signInWithEmail({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      console.log('Attempting email sign in for:', email.trim());

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Unexpected sign in error:', error);
      return { success: false, error: 'Sign in failed. Please try again.' };
    }
  }

  /**
   * Sign up with email and password
   */
  static async signUpWithEmail({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      console.log('Attempting email sign up for:', email.trim());

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error.message };
      }

      // Check if email verification is required
      if (data.user && !data.session) {
        return {
          success: true,
          requiresEmailVerification: true,
        };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Unexpected sign up error:', error);
      return { success: false, error: 'Sign up failed. Please try again.' };
    }
  }

  /**
   * Sign out current user
   */
  static async signOut(): Promise<AuthResult> {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Unexpected sign out error:', error);
      return { success: false, error: 'Sign out failed. Please try again.' };
    }
  }

  /**
   * Get current session
   */
  static async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Get session error:', error);
        return null;
      }

      return data.session;
    } catch (error) {
      console.error('Unexpected get session error:', error);
      return null;
    }
  }
}
