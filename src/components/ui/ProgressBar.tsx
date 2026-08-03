import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  height?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = false,
  height = 8,
  color = colors.primary[500],
  backgroundColor = colors.neutral[200],
  style,
}) => (
  <View style={style}>
    {(label || showPercentage) && (
      <View style={styles.header}>
        {label && <Text style={styles.label}>{label}</Text>}
        {showPercentage && (
          <Text style={styles.percentage}>{Math.round(progress)}%</Text>
        )}
      </View>
    )}
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: color,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  label: {
    ...typography.styles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  percentage: {
    ...typography.styles.caption,
    color: colors.text.secondary,
  },
  container: {
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
