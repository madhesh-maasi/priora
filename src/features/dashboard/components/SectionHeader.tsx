import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onActionPress,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity onPress={onActionPress}>
        <Text style={styles.action}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
  },
  action: {
    ...typography.styles.labelSmall,
    color: colors.primary[600],
    fontWeight: '600',
  },
});
