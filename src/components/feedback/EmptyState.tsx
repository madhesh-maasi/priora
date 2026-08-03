import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
  style,
}) => (
  <View style={[styles.container, style]}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.title}>{title}</Text>
    {description && <Text style={styles.description}>{description}</Text>}
    {actionLabel && onAction && (
      <View style={styles.buttonContainer}>
        <Button onPress={onAction} size="md">
          {actionLabel}
        </Button>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  icon: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.styles.h3,
    color: colors.text.primary,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  description: {
    ...typography.styles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
    maxWidth: 300,
  },
  buttonContainer: {
    marginTop: spacing[2],
    width: '100%',
    maxWidth: 200,
  },
});
