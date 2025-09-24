import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Text } from './Text';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  lightColor?: string;
  darkColor?: string;
};

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  lightColor,
  darkColor,
  disabled,
  ...rest
}: ButtonProps) {
  const primaryColor = useThemeColor(
    { light: lightColor || '#0a7ea4', dark: darkColor || '#0a7ea4' },
    'tint'
  );

  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.base, sizeStyles[size]];

    switch (variant) {
      case 'primary':
        return [...baseStyle, { backgroundColor: primaryColor }];
      case 'secondary':
        return [...baseStyle, styles.secondary, { borderColor: primaryColor }];
      case 'ghost':
        return [...baseStyle, styles.ghost];
      case 'danger':
        return [...baseStyle, styles.danger];
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return '#ffffff';
      case 'secondary':
      case 'ghost':
        return primaryColor;
      case 'danger':
        return '#ffffff';
      default:
        return '#ffffff';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        getButtonStyle(),
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text
        style={[styles.text, sizeTextStyles[size], { color: getTextColor() }, textStyle]}
        weight="semibold"
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: '#dc2626',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
});

const sizeStyles = StyleSheet.create({
  small: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  large: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});

const sizeTextStyles = StyleSheet.create({
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
});
