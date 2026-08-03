import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { EmptyState } from '@/components/feedback/EmptyState';
import { colors, spacing } from '@/theme';
import { TaskCard } from './TaskCard';
import type { Task } from '../types/task.types';

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onTaskPress?: (task: Task) => void;
  onTaskComplete?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
  showActions?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading = false,
  onTaskPress,
  onTaskComplete,
  onTaskDelete,
  showActions = true,
}) => {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No tasks"
        description="Create a new task to get started"
      />
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onPress={() => onTaskPress?.(item)}
          onComplete={onTaskComplete}
          onDelete={onTaskDelete}
          showActions={showActions}
        />
      )}
      scrollEnabled={false}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  list: {
    paddingHorizontal: spacing[4],
  },
});
