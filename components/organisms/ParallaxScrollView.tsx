import React from 'react';
import { StyleSheet, type ViewStyle, type ImageSourcePropType } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import { View } from '@/components/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 250;

export type ParallaxScrollViewProps = {
  headerImage: ImageSourcePropType | React.ReactElement;
  headerBackgroundColor?: { light: string; dark: string };
  children: React.ReactNode;
  style?: ViewStyle;
};

export function ParallaxScrollView({
  headerImage,
  headerBackgroundColor,
  children,
  style,
}: ParallaxScrollViewProps) {
  const scrollY = useSharedValue(0);
  const backgroundColor = useThemeColor(headerBackgroundColor || {}, 'background');

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor },
            headerAnimatedStyle,
          ]}>
          {React.isValidElement(headerImage) ? (
            headerImage
          ) : (
            <Animated.Image
              source={headerImage as ImageSourcePropType}
              style={styles.headerImage}
              resizeMode="cover"
            />
          )}
        </Animated.View>
        <View style={[styles.content, style]}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    height: '100%',
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});