import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import type { Subtask } from '../types/subtask.types';

interface SubtaskItemProps {
  subtask: Subtask;
  onToggleComplete?: (subtaskId: string, isCompleted: boolean) => void;
  onDelete?: (subtaskId: string) => void;
  onEdit?: (subtask: Subtask) => void;
  showActions?: boolean;
}

export const SubtaskItem: React.FC<SubtaskItemProps> = ({
  subtask,
  onToggleComplete,
  onDelete,
  onEdit,
  showActions = true,
}) => {
  const handleDelete = () => {
    Alert.alert('Delete Subtask', 'Are you sure you want to delete this subtask?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete?.(subtask.id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggleComplete?.(subtask.id, !subtask.isCompleted)}
      >
        <View style={[styles.checkboxInner, subtask.isCompleted && styles.checkboxChecked]}>
          {subtask.isCompleted && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            subtask.isCompleted && styles.titleCompleted,
          ]}
          numberOfLines={2}
        >
          {subtask.title}
        </Text>
        {subtask.description && (
          <Text style={styles.description} numberOfLines={1}>
            {subtask.description}
          </Text>
        )}
      </View>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit?.(subtask)} style={styles.actionIcon}>
            <Text style={styles.actionText}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionIcon}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    marginBottom: spacing[1],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[2],
  },
  checkbox: {
    marginRight: spacing[3],
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.neutral[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success[500],
    borderColor: colors.success[500],
  },
  checkmark: {
    color: colors.bg.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  title: {
    ...typography.styles.body,
    color: colors.text.primary,
  },
  titleCompleted: {
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  description: {
    ...typography.styles.bodySm,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionIcon: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  actionText: {
    fontSize: 16,
    color: colors.primary[500],
  },
  deleteText: {
    fontSize: 16,
    color: colors.error[500],
  },
});
