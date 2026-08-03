import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge = React.forwardRef<View, BadgeProps>(
  ({ children, variant = 'default', size = 'md', style, textStyle }, ref) => {
    const colorMap: Record<BadgeVariant, { bg: string; text: string }> = {
      default: { bg: colors.neutral[200], text: colors.text.primary },
      primary: { bg: colors.primary[100], text: colors.primary[700] },
      success: { bg: colors.success[100], text: colors.success[700] },
      warning: { bg: colors.warning[100], text: colors.warning[700] },
      error: { bg: colors.error[100], text: colors.error[700] },
      info: { bg: colors.secondary[100], text: colors.secondary[700] },
    };

    const { bg, text } = colorMap[variant];

    const sizeStyles = {
      sm: { paddingHorizontal: spacing[2], paddingVertical: spacing[0.5] },
      md: { paddingHorizontal: spacing[2.5], paddingVertical: spacing[1] },
      lg: { paddingHorizontal: spacing[3], paddingVertical: spacing[1.5] },
    };

    return (
      <View
        ref={ref}
        style={[
          styles.badge,
          { backgroundColor: bg },
          sizeStyles[size],
          style,
        ]}
      >
        <Text style={[styles.text, { color: text, fontSize: size === 'sm' ? 12 : 14 }, textStyle]}>
          {children}
        </Text>
      </View>
    );
  },
);

Badge.displayName = 'Badge';

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    lineHeight: 16,
  },
});
