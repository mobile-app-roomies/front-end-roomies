import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';

import { supabase } from '@/lib/supabase';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // Handle the OAuth callback
    const handleCallback = async () => {
      try {
        if (Platform.OS === 'web') {
          // Web: Get tokens from URL hash
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const access_token = hashParams.get('access_token');
          const refresh_token = hashParams.get('refresh_token');

          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (error) {
              console.error('Error setting session:', error);
              router.replace('/(auth)');
            } else {
              router.replace('/(tabs)');
            }
          } else {
            router.replace('/(auth)');
          }
        } else {
          // Mobile: This shouldn't be called directly, handled in AuthContext
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.replace('/(auth)');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.tint} />
      <Text style={[styles.text, { color: colors.text }]}>Signing you in...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
});
