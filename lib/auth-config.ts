import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const AUTH_SCHEME = 'com.roomies.app';

export function getAuthRedirectUri(): string {
  if (Platform.OS === 'web') {
    return 'http://localhost:8081/(auth)/callback';
  }

  // Pour mobile - utiliser le scheme custom qui marche partout
  return `${AUTH_SCHEME}://auth/callback`;
}

// Liste des URLs de redirection à ajouter dans Supabase
export const SUPABASE_REDIRECT_URLS = [
  // Production mobile
  `${AUTH_SCHEME}://auth/callback`,
  `${AUTH_SCHEME}://`,

  // Développement web
  'http://localhost:8081/(auth)/callback',
  'http://localhost:3000/(auth)/callback',

  // Expo Go - différentes IPs possibles
  'exp://localhost:19000/--/auth/callback',
  'exp://127.0.0.1:19000/--/auth/callback',
  'exp://10.0.2.2:8081/--/auth/callback', // Android emulator
  'exp://192.168.1.0/19000/--/auth/callback', // Réseau local (ajustez votre IP)

  // Expo Auth proxy
  'https://auth.expo.io/@your-username/supercours',
];
