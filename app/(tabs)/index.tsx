import { Text, View } from '@/components/atoms';
import { useAuth } from '@/hooks/useAuth';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: signOut 
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="title" weight="bold">Welcome to Roomies! 🏠</Text>
      </View>
      
      {user && (
        <View style={styles.userInfo}>
          <Text variant="subtitle">Hello, {user.name}!</Text>
          <Text>Email: {user.email}</Text>
          <Text>Provider: {user.provider}</Text>
        </View>
      )}

      <Text style={styles.description}>
        Your roommate chore management app is ready! Start by creating or joining a house.
      </Text>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: 'center',
    gap: 8,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    lineHeight: 24,
  },
  signOutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  signOutText: {
    color: 'white',
    fontWeight: '600',
  },
});
