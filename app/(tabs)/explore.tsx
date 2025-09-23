import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Text, View, Spacer } from '@/components/atoms';
import { IconSymbol } from '@/components/atoms/IconSymbol';
import { ExternalLink } from '@/components/molecules';
import { Collapsible, ParallaxScrollView } from '@/components/organisms';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <View style={styles.titleContainer}>
        <Text
          variant="title"
          weight="bold"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </Text>
      </View>
      <Text>This app includes example code to help you get started.</Text>
      <Collapsible title="File-based routing">
        <Text>
          This app has two screens:{' '}
          <Text weight="semibold">app/(tabs)/index.tsx</Text> and{' '}
          <Text weight="semibold">app/(tabs)/explore.tsx</Text>
        </Text>
        <Spacer size="sm" />
        <Text>
          The layout file in <Text weight="semibold">app/(tabs)/_layout.tsx</Text>{' '}
          sets up the tab navigator.
        </Text>
        <Spacer size="sm" />
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          Learn more
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Text>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <Text weight="semibold">w</Text> in the terminal running this project.
        </Text>
      </Collapsible>
      <Collapsible title="Images">
        <Text>
          For static images, you can use the <Text weight="semibold">@2x</Text> and{' '}
          <Text weight="semibold">@3x</Text> suffixes to provide files for
          different screen densities
        </Text>
        <Spacer size="sm" />
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Spacer size="sm" />
        <ExternalLink href="https://reactnative.dev/docs/images">
          Learn more
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Text>
          This template has light and dark mode support. The{' '}
          <Text weight="semibold">useColorScheme()</Text> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </Text>
        <Spacer size="sm" />
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          Learn more
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Text>
          This template includes an example of an animated component. The{' '}
          <Text weight="semibold">components/organisms/HelloWave.tsx</Text> component uses
          the powerful{' '}
          <Text weight="semibold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </Text>{' '}
          library to create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <>
              <Spacer size="sm" />
              <Text>
                The <Text weight="semibold">components/organisms/ParallaxScrollView.tsx</Text>{' '}
                component provides a parallax effect for the header image.
              </Text>
            </>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
