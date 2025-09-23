import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/atoms';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="title" weight="bold">superCours</Text>
      </View>
      <Text>Votre application superCours est prête !</Text>
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
});
