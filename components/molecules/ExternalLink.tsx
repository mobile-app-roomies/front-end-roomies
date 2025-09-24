import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Text, type TextProps } from '@/components/atoms';

export type ExternalLinkProps = Omit<TextProps, 'onPress'> & {
  href: string;
  asChild?: boolean;
  children: React.ReactNode;
};

export function ExternalLink({ href, asChild = false, children, ...rest }: ExternalLinkProps) {
  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      await WebBrowser.openBrowserAsync(href);
    } else {
      Linking.openURL(href);
    }
  };

  if (asChild) {
    return (
      <Text variant="link" {...rest} onPress={handlePress}>
        {children}
      </Text>
    );
  }

  return (
    <Text variant="link" {...rest} onPress={handlePress}>
      {children}
    </Text>
  );
}
