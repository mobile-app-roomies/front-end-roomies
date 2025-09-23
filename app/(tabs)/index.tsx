import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Text, View, Spacer } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { HelloWave, ParallaxScrollView } from '@/components/organisms';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.titleContainer}>
        <Text variant="title" weight="bold">Welcome!</Text>
        <HelloWave />
      </View>
      <Card title="Step 1: Try it" style={styles.stepContainer}>
        <Text>
          Edit <Text weight="semibold">app/(tabs)/index.tsx</Text> to see changes.
          Press{' '}
          <Text weight="semibold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </Text>{' '}
          to open developer tools.
        </Text>
      </Card>
      <Card title="Step 2: Explore" style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <Text variant="link">Open Modal</Text>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>
        <Spacer size="sm" />
        <Text>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </Text>
      </Card>
      <Card title="Step 3: Get a fresh start" style={styles.stepContainer}>
        <Text>
          {`When you're ready, run `}
          <Text weight="semibold">npm run reset-project</Text> to get a fresh{' '}
          <Text weight="semibold">app</Text> directory. This will move the current{' '}
          <Text weight="semibold">app</Text> to{' '}
          <Text weight="semibold">app-example</Text>.
        </Text>
      </Card>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
