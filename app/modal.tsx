import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View, Button, Spacer } from '@/components/atoms';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text variant="title" weight="bold">Modal superCours</Text>
      <Spacer size="lg" />
      <Link href="/" dismissTo asChild>
        <Button title="Retour à l'accueil" variant="primary" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
