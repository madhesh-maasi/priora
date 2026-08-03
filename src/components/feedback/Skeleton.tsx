import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius: radius = borderRadius.md,
  style,
}) => {
  const opacity = new Animated.Value(0.5);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius: radius,
          opacity,
        },
        style,
      ]}
    />
  );
};

interface SkeletonGroupProps {
  count?: number;
  spacing?: number;
  height?: number;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  count = 3,
  spacing: gap = spacing[2],
  height = 16,
}) => (
  <View>
    {Array.from({ length: count }).map((_, i) => (
      <View
        key={i}
        style={{
          marginBottom: i < count - 1 ? gap : 0,
        }}
      >
        <Skeleton height={height} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: colors.neutral[200],
  },
});
