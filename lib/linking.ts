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

export const handleDeepLink = (url: string): boolean => {
  console.log('Handling deep link:', url);

  const { hostname, path } = Linking.parse(url);

  // Check if this is an auth callback
  if (path?.includes('auth/callback') || hostname === 'auth') {
    return true;
  }

  return false;
};
