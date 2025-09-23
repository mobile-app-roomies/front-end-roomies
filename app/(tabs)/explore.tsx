import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/atoms';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text variant="title" weight="bold">Explorer</Text>
      </View>
      <Text>Explorez les fonctionnalités de superCours</Text>
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
