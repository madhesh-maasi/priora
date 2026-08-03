import React from 'react';
import { StyleSheet, View, Text, Image, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  initials?: string;
  size?: AvatarSize;
  color?: string;
  style?: ViewStyle;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

const fontSizeMap: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 20,
};

export const Avatar = React.forwardRef<View, AvatarProps>(
  ({ src, initials, size = 'md', color = colors.primary[500], style }, ref) => {
    const dimension = sizeMap[size];
    const fontSize = fontSizeMap[size];

    return (
      <View
        ref={ref}
        style={[
          styles.avatar,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
            backgroundColor: color,
          },
          style,
        ]}
      >
        {src ? (
          <Image
            source={{ uri: src }}
            style={{
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
            }}
          />
        ) : (
          <Text style={[styles.initials, { fontSize }]}>{initials || '?'}</Text>
        )}
      </View>
    );
  },
);

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary[500],
    overflow: 'hidden',
  },
  initials: {
    color: colors.text.inverse,
    fontWeight: '600',
    textAlign: 'center',
  },
});
