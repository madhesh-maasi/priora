import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color?: string;
  suffix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  color = colors.primary[500],
  suffix = '',
}) => (
  <View style={[styles.card, { borderLeftColor: color }]}>
    <Text style={styles.icon}>{icon}</Text>
    <View style={styles.content}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>
        {value}
        {suffix}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[2],
    borderLeftWidth: 4,
    gap: spacing[3],
  },
  icon: {
    fontSize: 28,
  },
  content: {
    flex: 1,
  },
  label: {
    ...typography.styles.caption,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  value: {
    ...typography.styles.h2,
    fontWeight: '600',
  },
});
