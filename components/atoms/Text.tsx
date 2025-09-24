import { StyleSheet, Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'title' | 'subtitle' | 'body' | 'caption' | 'link';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
};

export function Text({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  weight = 'regular',
  ...rest
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <RNText
      style={[{ color }, styles.base, styles[variant], weightStyles[weight], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    lineHeight: 24,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
});

const weightStyles = StyleSheet.create({
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});
