import React from 'react';
import { StyleSheet, TextInput, View, Text, ViewStyle, TextInputProps } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, helper, required, containerStyle, style, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}>*</Text>}
          </Text>
        )}
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.errorInput, style]}
          placeholderTextColor={colors.text.tertiary}
          {...props}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        {helper && !error && <Text style={styles.helper}>{helper}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...typography.styles.bodySm,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing[1.5],
  },
  required: {
    color: colors.error[600],
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    ...typography.styles.body,
    color: colors.text.primary,
    backgroundColor: colors.bg.primary,
  },
  errorInput: {
    borderColor: colors.error[600],
  },
  error: {
    ...typography.styles.bodyXs,
    color: colors.error[600],
    marginTop: spacing[1],
  },
  helper: {
    ...typography.styles.bodyXs,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
});
