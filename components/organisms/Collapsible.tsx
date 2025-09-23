import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, Text, Icon } from '@/components/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

export type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const animatedHeight = useSharedValue(defaultOpen ? 1 : 0);
  const animatedRotate = useSharedValue(defaultOpen ? 90 : 0);
  const borderColor = useThemeColor(
    { light: '#e5e5e5', dark: '#404040' },
    'border'
  );

  const toggleCollapsible = () => {
    const newValue = !isOpen;
    setIsOpen(newValue);
    animatedHeight.value = withTiming(newValue ? 1 : 0, { duration: 300 });
    animatedRotate.value = withTiming(newValue ? 90 : 0, { duration: 300 });
  };

  const bodyAnimatedStyle = useAnimatedStyle(() => ({
    opacity: animatedHeight.value,
    maxHeight: animatedHeight.value * 500,
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${animatedRotate.value}deg` }],
  }));

  return (
    <View style={[styles.container, { borderColor }]}>
      <Pressable
        onPress={toggleCollapsible}
        style={({ pressed }) => [
          styles.header,
          pressed && styles.headerPressed,
        ]}>
        <Text variant="subtitle" weight="semibold" style={styles.title}>
          {title}
        </Text>
        <Animated.View style={iconAnimatedStyle}>
          <Icon name="chevron-forward" size={20} />
        </Animated.View>
      </Pressable>

      <Animated.View style={[styles.body, bodyAnimatedStyle]}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerPressed: {
    opacity: 0.7,
  },
  title: {
    flex: 1,
  },
  body: {
    overflow: 'hidden',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
});