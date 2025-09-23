import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';

type AuthMode = 'signin' | 'signup' | 'house';

interface HouseFormData {
  action: 'create' | 'join';
  houseName?: string;
  inviteCode?: string;
}

export default function AuthScreen() {
  const colorScheme = useColorScheme();
  const { 
    signInWithGoogle, 
    signInWithGitHub, 
    signInWithEmail, 
    signUpWithEmail, 
    isLoading, 
    error,
    clearError 
  } = useAuth();
  
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [houseForm, setHouseForm] = useState<HouseFormData>({ action: 'create' });

  const textColor = Colors[colorScheme ?? 'light'].text;
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const mutedColor = Colors[colorScheme ?? 'light'].tabIconDefault;

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (authMode === 'signup' && !name) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    try {
      if (authMode === 'signup') {
        await signUpWithEmail(email, password, name);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      console.error('Email auth error:', err);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      clearError();
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGitHub();
      }
    } catch (err) {
      console.error(`${provider} auth error:`, err);
    }
  };

  const renderAuthForm = () => (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { color: textColor }]}>
        {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
      </Text>
      
      <Text style={[styles.subtitle, { color: mutedColor }]}>
        {authMode === 'signup' 
          ? 'Join your roommates in managing chores' 
          : 'Sign in to continue managing chores'
        }
      </Text>

      {/* OAuth Buttons */}
      <View style={styles.oauthContainer}>
        <TouchableOpacity
          style={[styles.oauthButton, styles.googleButton]}
          onPress={() => handleOAuthSignIn('google')}
          disabled={isLoading}
        >
          <Ionicons name="logo-google" size={20} color="white" />
          <Text style={styles.oauthButtonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.oauthButton, styles.githubButton]}
          onPress={() => handleOAuthSignIn('github')}
          disabled={isLoading}
        >
          <Ionicons name="logo-github" size={20} color="white" />
          <Text style={styles.oauthButtonText}>
            Continue with GitHub
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={[styles.divider, { backgroundColor: mutedColor }]} />
        <Text style={[styles.dividerText, { color: mutedColor }]}>or</Text>
        <View style={[styles.divider, { backgroundColor: mutedColor }]} />
      </View>

      {/* Email Form */}
      <View style={styles.emailContainer}>
        {authMode === 'signup' && (
          <TextInput
            style={[styles.input, { color: textColor, borderColor: mutedColor }]}
            placeholder="Full Name"
            placeholderTextColor={mutedColor}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}
        
        <TextInput
          style={[styles.input, { color: textColor, borderColor: mutedColor }]}
          placeholder="Email"
          placeholderTextColor={mutedColor}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TextInput
          style={[styles.input, { color: textColor, borderColor: mutedColor }]}
          placeholder="Password"
          placeholderTextColor={mutedColor}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleEmailAuth}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>
            {authMode === 'signup' ? 'Create Account' : 'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Switch Auth Mode */}
      <TouchableOpacity
        style={styles.switchContainer}
        onPress={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      >
        <Text style={[styles.switchText, { color: mutedColor }]}>
          {authMode === 'signup' 
            ? "Already have an account? " 
            : "Don't have an account? "
          }
          <Text style={[styles.switchLink, { color: Colors[colorScheme ?? 'light'].tint }]}>
            {authMode === 'signup' ? 'Sign In' : 'Sign Up'}
          </Text>
        </Text>
      </TouchableOpacity>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );

  const renderHouseForm = () => (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { color: textColor }]}>
        Welcome! 🏠
      </Text>
      
      <Text style={[styles.subtitle, { color: mutedColor }]}>
        Let&apos;s get you set up with a house
      </Text>

      {/* House Action Selection */}
      <View style={styles.houseActionContainer}>
        <TouchableOpacity
          style={[
            styles.houseActionButton,
            houseForm.action === 'create' && styles.houseActionButtonActive,
            { borderColor: mutedColor }
          ]}
          onPress={() => setHouseForm({ action: 'create' })}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={houseForm.action === 'create' ? Colors[colorScheme ?? 'light'].tint : mutedColor} 
          />
          <Text style={[
            styles.houseActionText,
            { color: houseForm.action === 'create' ? Colors[colorScheme ?? 'light'].tint : mutedColor }
          ]}>
            Create House
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.houseActionButton,
            houseForm.action === 'join' && styles.houseActionButtonActive,
            { borderColor: mutedColor }
          ]}
          onPress={() => setHouseForm({ action: 'join' })}
        >
          <Ionicons 
            name="people" 
            size={24} 
            color={houseForm.action === 'join' ? Colors[colorScheme ?? 'light'].tint : mutedColor} 
          />
          <Text style={[
            styles.houseActionText,
            { color: houseForm.action === 'join' ? Colors[colorScheme ?? 'light'].tint : mutedColor }
          ]}>
            Join House
          </Text>
        </TouchableOpacity>
      </View>

      {/* House Form Fields */}
      <View style={styles.emailContainer}>
        {houseForm.action === 'create' ? (
          <TextInput
            style={[styles.input, { color: textColor, borderColor: mutedColor }]}
            placeholder="House Name (e.g., 'The Cool Roomies')"
            placeholderTextColor={mutedColor}
            value={houseForm.houseName || ''}
            onChangeText={(text) => setHouseForm(prev => ({ ...prev, houseName: text }))}
            autoCapitalize="words"
          />
        ) : (
          <TextInput
            style={[styles.input, { color: textColor, borderColor: mutedColor }]}
            placeholder="Invite Code"
            placeholderTextColor={mutedColor}
            value={houseForm.inviteCode || ''}
            onChangeText={(text) => setHouseForm(prev => ({ ...prev, inviteCode: text }))}
            autoCapitalize="characters"
            autoCorrect={false}
          />
        )}

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={() => {
            // TODO: Implement house creation/joining logic
            Alert.alert('Coming Soon', 'House management will be implemented next!');
          }}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>
            {houseForm.action === 'create' ? 'Create House' : 'Join House'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {authMode === 'house' ? renderHouseForm() : renderAuthForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formContainer: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  oauthContainer: {
    gap: 12,
    marginBottom: 24,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  githubButton: {
    backgroundColor: '#333',
  },
  oauthButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 16,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
  },
  emailContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
  },
  switchLink: {
    fontWeight: '600',
  },
  errorContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  houseActionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  houseActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    borderRadius: 12,
    gap: 8,
  },
  houseActionButtonActive: {
    backgroundColor: '#f0f9ff',
  },
  houseActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
