import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { subtaskService } from '../services/subtaskService';
import { queryKeys } from '@/lib/queryKeys';
import type { CreateSubtaskInput, UpdateSubtaskInput, Subtask } from '../types/subtask.types';

export const useSubtaskMutations = (taskId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createSubtask = useMutation({
    mutationFn: async (input: CreateSubtaskInput) => {
      if (!user) throw new Error('User not authenticated');
      return subtaskService.createSubtask(user.id, input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.byTask(taskId) });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.subtasks.byTask(taskId), 'stats'] });
    },
  });

  const updateSubtask = useMutation({
    mutationFn: async ({ subtaskId, input }: { subtaskId: string; input: UpdateSubtaskInput }) => {
      return subtaskService.updateSubtask(subtaskId, input);
    },
    onSuccess: (data: Subtask) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.byTask(taskId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.subtasks.byTask(taskId), 'stats'] });
    },
  });

  const deleteSubtask = useMutation({
    mutationFn: async (subtaskId: string) => {
      return subtaskService.deleteSubtask(subtaskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.byTask(taskId) });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.subtasks.byTask(taskId), 'stats'] });
    },
  });

  const completeSubtask = useMutation({
    mutationFn: async (subtaskId: string) => {
      return subtaskService.completeSubtask(subtaskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.byTask(taskId) });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.subtasks.byTask(taskId), 'stats'] });
    },
  });

  const uncompleteSubtask = useMutation({
    mutationFn: async (subtaskId: string) => {
      return subtaskService.uncompleteSubtask(subtaskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.byTask(taskId) });
      queryClient.invalidateQueries({ queryKey: [...queryKeys.subtasks.byTask(taskId), 'stats'] });
    },
  });

  const reorderSubtasks = useMutation({
    mutationFn: async (reordering: Array<{ id: string; order: number }>) => {
      return subtaskService.reorderSubtasks(taskId, reordering);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.subtasks.byTask(taskId) });
    },
  });

  return {
    createSubtask,
    updateSubtask,
    deleteSubtask,
    completeSubtask,
    uncompleteSubtask,
    reorderSubtasks,
  };
};
