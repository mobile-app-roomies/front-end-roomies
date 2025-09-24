import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { supabase } from '@/lib/supabase';
import { getAuthRedirectUri } from '@/lib/auth-config';

export interface OAuthResult {
  success: boolean;
  error?: string;
}

export class OAuthHandler {
  static async signInWithProvider(provider: 'google'): Promise<OAuthResult> {
    try {
      const redirectUri = getAuthRedirectUri();
      console.log(`Starting ${provider} OAuth with redirect:`, redirectUri);

      if (Platform.OS === 'web') {
        return await this.handleWebOAuth(provider, redirectUri);
      } else {
        return await this.handleMobileOAuth(provider, redirectUri);
      }
    } catch (error: any) {
      console.error(`Error in ${provider} OAuth:`, error);
      return { success: false, error: error.message };
    }
  }

  private static async handleWebOAuth(
    provider: 'google',
    redirectUri: string
  ): Promise<OAuthResult> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUri },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  private static async handleMobileOAuth(
    provider: 'google',
    redirectUri: string
  ): Promise<OAuthResult> {
    // 1. Get OAuth URL from Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true,
      },
    });

    if (error || !data?.url) {
      return { success: false, error: error?.message || 'No OAuth URL received' };
    }

    // 2. Open browser for authentication
    console.log('Opening OAuth URL in browser:', data.url);

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);

    if (result.type === 'cancel') {
      return { success: false, error: 'Authentication cancelled' };
    }

    if (result.type !== 'success' || !result.url) {
      return { success: false, error: 'Authentication failed' };
    }

    // 3. Extract and set session tokens
    return await this.handleOAuthCallback(result.url);
  }

  private static async handleOAuthCallback(callbackUrl: string): Promise<OAuthResult> {
    console.log('Processing OAuth callback:', callbackUrl);

    const tokens = this.extractTokensFromUrl(callbackUrl);

    if (!tokens.accessToken || !tokens.refreshToken) {
      return { success: false, error: 'No authentication tokens received' };
    }

    // Set session with extracted tokens
    const { error } = await supabase.auth.setSession({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    console.log('OAuth session set successfully');
    return { success: true };
  }

  private static extractTokensFromUrl(url: string): {
    accessToken?: string;
    refreshToken?: string;
  } {
    // Try hash parameters first (#)
    const hashMatch = url.match(/#(.+)$/);
    if (hashMatch) {
      const params = new URLSearchParams(hashMatch[1]);
      return {
        accessToken: params.get('access_token') || undefined,
        refreshToken: params.get('refresh_token') || undefined,
      };
    }

    // Try query parameters (?)
    const queryMatch = url.match(/\?(.+?)(?:#|$)/);
    if (queryMatch) {
      const params = new URLSearchParams(queryMatch[1]);
      return {
        accessToken: params.get('access_token') || undefined,
        refreshToken: params.get('refresh_token') || undefined,
      };
    }

    return {};
  }
}
