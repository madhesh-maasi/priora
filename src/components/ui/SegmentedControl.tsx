import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface SegmentOption {
  label: string;
  value: string | number;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string | number;
  onValueChange: (value: string | number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onValueChange,
  size = 'md',
}) => (
  <View style={[styles.container, styles[`container_${size}`]]}>
    {options.map((option) => (
      <TouchableOpacity
        key={option.value}
        style={[
          styles.segment,
          styles[`segment_${size}`],
          value === option.value && styles.segmentActive,
        ]}
        onPress={() => onValueChange(option.value)}
      >
        <Text
          style={[
            styles.label,
            styles[`label_${size}`],
            value === option.value && styles.labelActive,
          ]}
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.neutral[100],
    borderRadius: spacing[2],
    padding: spacing[1],
    gap: spacing[1],
  },
  container_sm: {
    height: 32,
  },
  container_md: {
    height: 40,
  },
  container_lg: {
    height: 48,
  },
  segment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing[1],
  },
  segment_sm: {
    paddingHorizontal: spacing[2],
  },
  segment_md: {
    paddingHorizontal: spacing[3],
  },
  segment_lg: {
    paddingHorizontal: spacing[4],
  },
  segmentActive: {
    backgroundColor: colors.bg.primary,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontWeight: '500',
    color: colors.text.secondary,
  },
  label_sm: {
    ...typography.styles.caption,
  },
  label_md: {
    ...typography.styles.labelMedium,
  },
  label_lg: {
    ...typography.styles.body,
  },
  labelActive: {
    color: colors.primary[600],
    fontWeight: '600',
  },
});
