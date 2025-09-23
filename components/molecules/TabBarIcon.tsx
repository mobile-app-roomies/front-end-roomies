import { Icon, type IconProps } from '@/components/atoms';
import { useThemeColor } from '@/hooks/use-theme-color';

export type TabBarIconProps = Omit<IconProps, 'color' | 'size'> & {
  focused?: boolean;
};

export function TabBarIcon({ focused = false, ...rest }: TabBarIconProps) {
  const focusedColor = useThemeColor({}, 'tint');
  const unfocusedColor = useThemeColor({}, 'tabIconDefault');

  return (
    <Icon
      {...rest}
      size={28}
      color={focused ? focusedColor : unfocusedColor}
    />
  );
}