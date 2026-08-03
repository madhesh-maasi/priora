import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import type { RecentTask } from '../types/dashboard.types';

interface DashboardTaskCardProps {
  task: RecentTask;
  onPress?: () => void;
}

const priorityColors = {
  LOW: colors.secondary[500],
  MEDIUM: colors.warning[500],
  HIGH: colors.error[500],
  CRITICAL: colors.error[600],
};

const statusIcons = {
  NOT_STARTED: '○',
  IN_PROGRESS: '◐',
  BLOCKED: '⊗',
  COMPLETED: '✓',
  CANCELLED: '×',
};

export const DashboardTaskCard: React.FC<DashboardTaskCardProps> = ({
  task,
  onPress,
}) => {
  const priorityColor = priorityColors[task.priority];
  const statusIcon = statusIcons[task.status];
  const isCompleted = task.status === 'COMPLETED';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.statusIcon, { color: priorityColor }]}>
            {statusIcon}
          </Text>
          <Text
            style={[
              styles.title,
              isCompleted && styles.titleCompleted,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>
        </View>

        {task.dueDate && (
          <Text style={styles.dueDate}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={[styles.priority, { borderLeftColor: priorityColor }]}>
        <Text style={styles.priorityText}>
          {task.priority.charAt(0)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[3],
    backgroundColor: colors.bg.secondary,
    borderRadius: spacing[2],
    marginBottom: spacing[2],
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: spacing[2],
  },
  title: {
    flex: 1,
    ...typography.styles.body,
    color: colors.text.primary,
  },
  titleCompleted: {
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  dueDate: {
    ...typography.styles.caption,
    color: colors.text.tertiary,
    marginLeft: spacing[6],
  },
  priority: {
    borderLeftWidth: 3,
    paddingLeft: spacing[2],
    marginLeft: spacing[2],
  },
  priorityText: {
    ...typography.styles.labelSmall,
    color: colors.text.secondary,
    fontWeight: '700',
  },
});
