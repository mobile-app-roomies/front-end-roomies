import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';
import { AuthService, type AuthCredentials } from '@/lib/auth/auth-service';
import { OAuthHandler } from '@/lib/auth/oauth-handler';

interface AuthContextType {
  // State
  user: User | null;
  session: Session | null;
  isLoading: boolean;

  // Email Authentication
  signInWithEmail: (credentials: AuthCredentials) => Promise<void>;
  signUpWithEmail: (credentials: AuthCredentials) => Promise<void>;

  // OAuth Authentication
  signInWithGoogle: () => Promise<void>;

  // Sign Out
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);
    return () => subscription.unsubscribe();
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    handleNavigation();
  }, [session, segments, isLoading]);

  /**
   * Initialize authentication state
   */
  async function initializeAuth() {
    try {
      const session = await AuthService.getCurrentSession();
      updateAuthState(session);
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Handle auth state changes from Supabase
   */
  function handleAuthStateChange(_event: string, session: Session | null) {
    console.log('Auth state changed:', _event, session?.user?.email);
    updateAuthState(session);
    setIsLoading(false);
  }

  /**
   * Update local auth state
   */
  function updateAuthState(session: Session | null) {
    setSession(session);
    setUser(session?.user ?? null);
  }

  /**
   * Handle navigation based on auth state
   */
  function handleNavigation() {
    if (isLoading) return;

    const isInAuthGroup = segments[0] === '(auth)';

    if (!session && !isInAuthGroup) {
      router.replace('/(auth)');
    } else if (session && isInAuthGroup) {
      router.replace('/(tabs)');
    }
  }

  /**
   * Sign in with email and password
   */
  async function signInWithEmail(credentials: AuthCredentials) {
    try {
      setIsLoading(true);
      const result = await AuthService.signInWithEmail(credentials);

      if (!result.success) {
        throw new Error(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Sign up with email and password
   */
  async function signUpWithEmail(credentials: AuthCredentials) {
    try {
      setIsLoading(true);
      const result = await AuthService.signUpWithEmail(credentials);

      if (!result.success) {
        throw new Error(result.error);
      }

      if (result.requiresEmailVerification) {
        throw new Error('Please check your email to verify your account');
      }
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Sign in with Google OAuth
   */
  async function signInWithGoogle() {
    try {
      setIsLoading(true);
      const result = await OAuthHandler.signInWithProvider('google');

      if (!result.success) {
        throw new Error(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Sign out current user
   */
  async function signOut() {
    try {
      setIsLoading(true);
      const result = await AuthService.signOut();

      if (!result.success) {
        throw new Error(result.error);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
