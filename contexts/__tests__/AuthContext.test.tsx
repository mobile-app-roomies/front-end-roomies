import { renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';

import { AuthProvider, useAuth } from '../AuthContext';
import { supabase } from '@/lib/supabase';

// Mock du router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSegments: () => [],
}));

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within an AuthProvider');

      consoleError.mockRestore();
    });

    it('should provide auth context when used inside AuthProvider', async () => {
      const mockSession = {
        user: { id: '123', email: 'test@example.com' },
        access_token: 'token',
      };

      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: mockSession },
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current).toHaveProperty('user');
      expect(result.current).toHaveProperty('session');
      expect(result.current).toHaveProperty('signInWithGoogle');
      expect(result.current).toHaveProperty('signInWithEmail');
      expect(result.current).toHaveProperty('signUpWithEmail');
      expect(result.current).toHaveProperty('signOut');
    });
  });

  describe('signInWithEmail', () => {
    it('should successfully sign in with valid credentials', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      const mockSession = { user: mockUser, access_token: 'token' };

      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
      });

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.signInWithEmail('test@example.com', 'password123');

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should handle sign in error', async () => {
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
      });

      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid credentials' },
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        result.current.signInWithEmail('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('signUpWithEmail', () => {
    it('should successfully sign up with valid credentials', async () => {
      const mockUser = { id: '123', email: 'test@example.com' };
      const mockSession = { user: mockUser, access_token: 'token' };

      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
      });

      (supabase.auth.signUp as jest.Mock).mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const response = await result.current.signUpWithEmail('newuser@example.com', 'password123');

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'password123',
      });

      expect(response).toEqual({ user: mockUser, session: mockSession });
    });
  });

  describe('signOut', () => {
    it('should successfully sign out', async () => {
      (supabase.auth.getSession as jest.Mock).mockResolvedValue({
        data: { session: null },
      });

      (supabase.auth.signOut as jest.Mock).mockResolvedValue({
        error: null,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await result.current.signOut();

      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });
});
