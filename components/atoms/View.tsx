import { View as RNView, type ViewProps as RNViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ViewProps = RNViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function View({
  style,
  lightColor,
  darkColor,
  ...rest
}: ViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <RNView style={[{ backgroundColor }, style]} {...rest} />;
}