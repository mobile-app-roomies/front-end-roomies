import { StyleSheet, type ViewStyle } from 'react-native';
import { View, Text, Spacer } from '@/components/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

export type CardProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
};

export function Card({
  title,
  subtitle,
  children,
  style,
  padded = true,
}: CardProps) {
  const borderColor = useThemeColor(
    { light: '#e5e5e5', dark: '#404040' },
    'border'
  );

  return (
    <View
      style={[
        styles.container,
        { borderColor },
        padded && styles.padded,
        style,
      ]}>
      {(title || subtitle) && (
        <>
          {title && (
            <Text variant="subtitle" weight="bold">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text variant="caption" style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
          <Spacer size="sm" />
        </>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  padded: {
    padding: 16,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
});