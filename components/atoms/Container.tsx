import { StyleSheet, ScrollView, type ViewStyle } from 'react-native';
import { View } from './View';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ContainerProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  safe?: boolean;
  style?: ViewStyle;
  lightColor?: string;
  darkColor?: string;
};

export function Container({
  children,
  scrollable = false,
  padded = true,
  safe = false,
  style,
  lightColor,
  darkColor,
}: ContainerProps) {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    padded && styles.padded,
    safe && {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={containerStyle}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={containerStyle}
      lightColor={lightColor}
      darkColor={darkColor}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    padding: 16,
  },
});