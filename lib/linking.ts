import * as Linking from 'expo-linking';

// Deep link configuration
export const linking = {
  prefixes: [
    Linking.createURL('/'),
    'com.roomies.app://',
    'https://roomies-app.com',
    'exp://127.0.0.1:8081',
  ],
  config: {
    screens: {
      '(tabs)': {
        screens: {
          index: 'home',
          explore: 'explore',
        },
      },
      auth: 'auth',
      'auth-callback': 'auth/callback',
      modal: 'modal',
    },
  },
};

// Helper functions for deep linking
export const createAuthRedirectUrl = () => {
  // For development, use expo tunnel URL
  if (__DEV__) {
    return `${Linking.createURL('/')}`; 
  }
  // For production, use your custom scheme
  return 'com.roomies.app://auth/callback';
};

export const parseAuthUrl = (url: string) => {
  const parsed = Linking.parse(url);
  const { queryParams } = parsed;
  
  // Check both query params and URL fragment for auth tokens
  const params = { ...queryParams };
  
  // Parse fragment from URL manually if needed
  const fragmentMatch = url.match(/#(.+)$/);
  if (fragmentMatch) {
    const fragmentParams = new URLSearchParams(fragmentMatch[1]);
    fragmentParams.forEach((value, key) => {
      params[key] = value;
    });
  }
  
  return {
    access_token: params.access_token as string,
    refresh_token: params.refresh_token as string,
    expires_in: params.expires_in ? parseInt(params.expires_in as string) : undefined,
    token_type: params.token_type as string,
    type: params.type as string,
    error: params.error as string,
    error_description: params.error_description as string,
  };
};

export const handleDeepLink = (url: string): boolean => {
  console.log('Handling deep link:', url);
  
  const { hostname, path } = Linking.parse(url);
  
  // Check if this is an auth callback
  if (path?.includes('auth/callback') || hostname === 'auth') {
    return true;
  }
  
  return false;
};
