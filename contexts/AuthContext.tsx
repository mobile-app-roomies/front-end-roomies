import { Session, User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { getAuthRedirectUri } from '@/lib/auth-config';
import { supabase } from '@/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; session: Session | null } | undefined>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)');
    } else if (session && inAuthGroup) {
      // Redirect to home if authenticated
      router.replace('/(tabs)');
    }
  }, [session, segments, isLoading]);

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);

      // Générer l'URL de redirection dynamiquement
      const redirectUri = getAuthRedirectUri();

      console.log('Using redirect URI:', redirectUri);

      if (Platform.OS === 'web') {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUri,
          },
        });
      } else {
        // Version mobile avec WebBrowser
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUri,
            skipBrowserRedirect: true, // Important pour mobile
          },
        });

        if (error) {
          console.error('OAuth error:', error);
          throw error;
        }

        if (data?.url) {
          console.log('Opening OAuth URL in browser:', data.url);

          // Ouvrir le navigateur pour l'authentification
          const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);

          console.log('OAuth browser result:', result);

          if (result.type === 'success' && result.url) {
            // Parser les tokens depuis l'URL de callback
            const url = result.url;
            console.log('Callback URL received:', url);

            // Extraire les tokens de l'URL (hash ou query params)
            let accessToken = '';
            let refreshToken = '';

            // Essayer les hash params (#)
            const hashMatch = url.match(/#(.+)$/);
            if (hashMatch) {
              const hashParams = new URLSearchParams(hashMatch[1]);
              accessToken = hashParams.get('access_token') || '';
              refreshToken = hashParams.get('refresh_token') || '';
            }

            // Si pas trouvé, essayer les query params (?)
            if (!accessToken) {
              const queryMatch = url.match(/\?(.+?)(?:#|$)/);
              if (queryMatch) {
                const queryParams = new URLSearchParams(queryMatch[1]);
                accessToken = queryParams.get('access_token') || '';
                refreshToken = queryParams.get('refresh_token') || '';
              }
            }

            if (accessToken && refreshToken) {
              console.log('Tokens found, setting session...');
              const { error: sessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

              if (sessionError) {
                console.error('Error setting session:', sessionError);
                throw sessionError;
              } else {
                console.log('Session set successfully!');
              }
            } else {
              console.error('No tokens found in callback URL');
              throw new Error('Authentication failed - no tokens received');
            }
          } else if (result.type === 'cancel') {
            console.log('User cancelled OAuth');
            throw new Error('Authentication was cancelled');
          } else {
            console.error('OAuth failed:', result);
            throw new Error('Authentication failed');
          }
        } else {
          throw new Error('No OAuth URL received from Supabase');
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting email sign in...', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting email sign up...', email);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      console.log('Sign up response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
