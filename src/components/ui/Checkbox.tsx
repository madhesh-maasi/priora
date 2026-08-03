import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  ({ checked, onChange, label, disabled = false, style }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        disabled={disabled}
        onPress={() => onChange(!checked)}
        style={[styles.container, style]}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            checked && styles.checkedCheckbox,
            disabled && styles.disabledCheckbox,
          ]}
        >
          {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        {label && (
          <Text style={[styles.label, disabled && styles.disabledLabel]}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  },
);

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg.primary,
  },
  checkedCheckbox: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  disabledCheckbox: {
    opacity: 0.5,
  },
  checkmark: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    marginLeft: spacing[2],
    fontSize: 14,
    fontWeight: '400',
    color: colors.text.primary,
  },
  disabledLabel: {
    opacity: 0.5,
  },
});
