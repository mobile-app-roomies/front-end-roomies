import { StyleSheet, Pressable, type ViewStyle } from 'react-native';
import { View, Text, Icon, type IconProps } from '@/components/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ListItemProps = {
  title: string;
  subtitle?: string;
  leftIcon?: Omit<IconProps, 'size'>;
  rightIcon?: Omit<IconProps, 'size'>;
  onPress?: () => void;
  style?: ViewStyle;
};

export function ListItem({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  style,
}: ListItemProps) {
  const borderColor = useThemeColor(
    { light: '#e5e5e5', dark: '#404040' },
    'border'
  );

  const content = (
    <View style={[styles.container, { borderColor }, style]}>
      {leftIcon && (
        <View style={styles.leftIcon}>
          <Icon {...leftIcon} size={24} />
        </View>
      )}

      <View style={styles.content}>
        <Text variant="body" weight="medium">
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {rightIcon && (
        <View style={styles.rightIcon}>
          <Icon {...rightIcon} size={20} />
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftIcon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  rightIcon: {
    marginLeft: 12,
  },
  subtitle: {
    marginTop: 2,
    opacity: 0.7,
  },
  pressed: {
    opacity: 0.7,
  },
});