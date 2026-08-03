import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTasks, useTaskMutations, TaskList } from '@/features/tasks';
import { QuickAddTask } from '@/features/tasks/components/QuickAddTask';
import { colors, spacing } from '@/theme';

export const AllTasksScreen: React.FC = () => {
  const { data: tasks, isLoading } = useTasks();
  const { createTask, completeTask, deleteTask } = useTaskMutations();

  const handleAddTask = async (title: string) => {
    await createTask.mutateAsync({
      title,
      priority: 'MEDIUM',
    });
  };

  const handleCompleteTask = async (taskId: string) => {
    await completeTask.mutateAsync(taskId);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask.mutateAsync(taskId);
  };

  return (
    <View style={styles.container}>
      <QuickAddTask onAdd={handleAddTask} isLoading={createTask.isPending} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TaskList
          tasks={tasks || []}
          isLoading={isLoading}
          onTaskComplete={handleCompleteTask}
          onTaskDelete={handleDeleteTask}
          showActions={true}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  content: { flex: 1, paddingVertical: spacing[3] },
});
