import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      onPress,
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      fullWidth = false,
      loading = false,
      style,
    },
    ref,
  ) => {
    const buttonStyle = [
      styles.button,
      styles[`${variant}Button`],
      styles[`${size}Button`],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      style,
    ];

    const textStyle = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
      disabled && styles.disabledText,
    ];

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyle}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        <Text style={textStyle}>{loading ? 'Loading...' : children}</Text>
      </TouchableOpacity>
    );
  },
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
  },

  // Variants
  primaryButton: {
    backgroundColor: colors.primary[600],
  },
  secondaryButton: {
    backgroundColor: colors.neutral[200],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary[600],
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: colors.error[600],
  },

  // Sizes
  smButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
  },
  mdButton: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2.5],
  },
  lgButton: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
  },

  // Text variants
  primaryText: {
    color: colors.text.inverse,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.primary[600],
  },
  ghostText: {
    color: colors.primary[600],
  },
  dangerText: {
    color: colors.text.inverse,
  },

  // Text sizes
  smText: {
    ...typography.styles.buttonSm,
  },
  mdText: {
    ...typography.styles.button,
  },
  lgText: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
  },

  // States
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.6,
  },

  text: {
    fontWeight: '600',
  },
});
