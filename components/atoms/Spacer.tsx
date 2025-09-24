import { View } from 'react-native';

export type SpacerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  horizontal?: boolean;
};

const sizes = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export function Spacer({ size = 'md', horizontal = false }: SpacerProps) {
  const dimension = sizes[size];

  return (
    <View
      style={{
        width: horizontal ? dimension : undefined,
        height: !horizontal ? dimension : undefined,
      }}
    />
  );
}
