import * as Linking from 'expo-linking';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { parseAuthUrl } from '../lib/linking';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { clearError } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Clear any previous errors
        clearError();

        console.log('Auth callback params:', params);

        // Get the current URL
        const currentUrl = await Linking.getInitialURL();
        console.log('Current URL:', currentUrl);

        // Try to get URL from params first, then from linking
        let url = '';
        if (typeof params.url === 'string') {
          url = params.url;
        } else if (currentUrl) {
          url = currentUrl;
        } else {
          // Construct URL from params
          const queryString = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
          url = `com.roomies.app://auth-callback?${queryString}`;
        }
        
        if (!url) {
          console.error('No URL found in auth callback');
          router.replace('/auth');
          return;
        }

        console.log('Processing auth URL:', url);

        // Parse the auth tokens from the URL
        const authParams = parseAuthUrl(url);
        console.log('Parsed auth params:', { ...authParams, access_token: authParams.access_token ? '[REDACTED]' : undefined });

        if (authParams.error) {
          console.error('Auth error:', authParams.error, authParams.error_description);
          router.replace('/auth');
          return;
        }

        if (authParams.access_token) {
          console.log('Setting session with tokens...');
          
          // Set the session in Supabase
          const { data, error } = await supabase.auth.setSession({
            access_token: authParams.access_token,
            refresh_token: authParams.refresh_token || '',
          });

          if (error) {
            console.error('Error setting session:', error);
            router.replace('/auth');
            return;
          }

          console.log('Session set successfully:', data.session?.user?.email);
          
          // Navigate to the main app
          router.replace('/(tabs)');
        } else {
          console.log('No access token found, redirecting to auth');
          router.replace('/auth');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.replace('/auth');
      }
    };

    // Add a small delay to ensure params are loaded
    const timeoutId = setTimeout(handleAuthCallback, 100);
    return () => clearTimeout(timeoutId);
  }, [params, router, clearError]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Completing sign in...</Text>
      <Text style={styles.debugText}>
        {Object.keys(params).length > 0 ? 'Processing authentication...' : 'Waiting for auth data...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 16,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  debugText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
