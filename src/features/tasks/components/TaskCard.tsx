import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { TaskHelpers } from '../utils/taskHelpers';
import type { Task } from '../types/task.types';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  onComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  showActions?: boolean;
}

const priorityColors = {
  LOW: colors.secondary[500],
  MEDIUM: colors.warning[500],
  HIGH: colors.error[500],
  CRITICAL: colors.error[600],
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onComplete,
  onDelete,
  showActions = true,
}) => {
  const priorityColor = priorityColors[task.priority];
  const statusIcon = TaskHelpers.getStatusIcon(task.status);
  const isCompleted = task.status === 'COMPLETED';

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => onDelete?.(task.id),
      },
    ]);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.header}>
          {showActions && (
            <TouchableOpacity
              style={styles.checkBox}
              onPress={() => onComplete?.(task.id)}
            >
              <Text style={[styles.statusIcon, isCompleted && styles.statusIconCompleted]}>
                {isCompleted ? '✓' : '○'}
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.title,
                isCompleted && styles.titleCompleted,
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>
            {task.description && (
              <Text style={styles.description} numberOfLines={1}>
                {task.description}
              </Text>
            )}
          </View>
          <View style={[styles.priority, { borderLeftColor: priorityColor }]}>
            <Text style={styles.priorityText}>{task.priority.charAt(0)}</Text>
          </View>
        </View>

        {task.dueDate && (
          <Text style={[styles.dueDate, TaskHelpers.isOverdue(task) && styles.dueDateOverdue]}>
            {TaskHelpers.formatDueDate(task)}
          </Text>
        )}

        {showActions && (
          <View style={styles.actions}>
            {task.status !== 'COMPLETED' && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onComplete?.(task.id)}
              >
                <Text style={styles.actionText}>✓ Complete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing[2],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[2],
    overflow: 'hidden',
  },
  content: {
    padding: spacing[3],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  },
  checkBox: {
    paddingRight: spacing[2],
  },
  statusIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.secondary,
  },
  statusIconCompleted: {
    color: colors.success[500],
  },
  title: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.primary,
    fontWeight: '600',
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
  priority: {
    borderLeftWidth: 3,
    paddingLeft: spacing[1],
    marginLeft: spacing[2],
  },
  priorityText: {
    ...typography.styles.labelSmall,
    color: colors.text.secondary,
    fontWeight: '700',
  },
  dueDate: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    marginBottom: spacing[2],
  },
  dueDateOverdue: {
    color: colors.error[600],
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[2],
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[2],
    backgroundColor: colors.primary[50],
    borderRadius: spacing[1],
    alignItems: 'center',
  },
  actionText: {
    ...typography.styles.labelSmall,
    color: colors.primary[600],
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.error[50],
  },
  deleteText: {
    ...typography.styles.labelSmall,
    color: colors.error[600],
    fontWeight: '600',
  },
});
