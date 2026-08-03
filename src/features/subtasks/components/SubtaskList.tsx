import React from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { SubtaskItem } from './SubtaskItem';
import type { Subtask, SubtaskStats } from '../types/subtask.types';

interface SubtaskListProps {
  subtasks: Subtask[];
  stats?: SubtaskStats;
  isLoading?: boolean;
  onToggleComplete?: (subtaskId: string, isCompleted: boolean) => void;
  onDelete?: (subtaskId: string) => void;
  onEdit?: (subtask: Subtask) => void;
  showActions?: boolean;
}

export const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  stats,
  isLoading = false,
  onToggleComplete,
  onDelete,
  onEdit,
  showActions = true,
}) => {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (!subtasks || subtasks.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No subtasks yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {stats && (
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {stats.completed} of {stats.total} complete
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${stats.completionPercentage}%` },
              ]}
            />
          </View>
        </View>
      )}

      <FlatList
        data={subtasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SubtaskItem
            subtask={item}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            showActions={showActions}
          />
        )}
        scrollEnabled={false}
        nestedScrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[3],
  },
  header: {
    marginBottom: spacing[3],
  },
  headerText: {
    ...typography.styles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing[2],
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: spacing[1],
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success[500],
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  empty: {
    paddingVertical: spacing[4],
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.styles.bodySm,
    color: colors.text.tertiary,
  },
});
