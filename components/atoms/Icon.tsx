import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { type ComponentProps } from 'react';
import { useThemeColor } from '@/hooks/use-theme-color';

export type IconLibrary = 'ionicons' | 'material' | 'feather';

export type IconProps = {
  library?: IconLibrary;
  name: string;
  size?: number;
  color?: string;
  lightColor?: string;
  darkColor?: string;
};

export function Icon({
  library = 'ionicons',
  name,
  size = 24,
  color,
  lightColor,
  darkColor,
}: IconProps) {
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'icon'
  );

  const finalColor = color || themeColor;

  switch (library) {
    case 'material':
      return (
        <MaterialIcons
          name={name as ComponentProps<typeof MaterialIcons>['name']}
          size={size}
          color={finalColor}
        />
      );
    case 'feather':
      return (
        <Feather
          name={name as ComponentProps<typeof Feather>['name']}
          size={size}
          color={finalColor}
        />
      );
    case 'ionicons':
    default:
      return (
        <Ionicons
          name={name as ComponentProps<typeof Ionicons>['name']}
          size={size}
          color={finalColor}
        />
      );
  }
}