import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Text, View, Button, Spacer } from '@/components/atoms';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text variant="title" weight="bold">This is a modal</Text>
      <Spacer size="lg" />
      <Link href="/" dismissTo asChild>
        <Button title="Go to home screen" variant="primary" />
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
