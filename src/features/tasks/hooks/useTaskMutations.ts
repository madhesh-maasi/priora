import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { taskService } from '../services/taskService';
import { queryKeys } from '@/lib/queryKeys';
import type { CreateTaskInput, UpdateTaskInput, Task } from '../types/task.types';

export const useTaskMutations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createTask = useMutation({
    mutationFn: async (input: CreateTaskInput) => {
      if (!user) throw new Error('User not authenticated');
      return taskService.createTask(user.id, input);
    },
    onSuccess: (data: Task) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.byStatus(data.status) });
      if (data.categoryId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks.byCategory(data.categoryId) });
      }
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ taskId, input }: { taskId: string; input: UpdateTaskInput }) => {
      return taskService.updateTask(taskId, input);
    },
    onSuccess: (data: Task) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.byStatus(data.status) });
      if (data.categoryId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks.byCategory(data.categoryId) });
      }
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      return taskService.deleteTask(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });

  const completeTask = useMutation({
    mutationFn: async (taskId: string) => {
      return taskService.completeTask(taskId);
    },
    onSuccess: (data: Task) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list() });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.completed() });
    },
  });

  const bulkUpdateStatus = useMutation({
    mutationFn: async ({ taskIds, status }: { taskIds: string[]; status: string }) => {
      return taskService.bulkUpdateStatus(taskIds, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });

  const bulkDelete = useMutation({
    mutationFn: async (taskIds: string[]) => {
      return taskService.bulkDelete(taskIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });

  return {
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    bulkUpdateStatus,
    bulkDelete,
  };
};
