import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { subtaskService } from '../services/subtaskService';
import { queryKeys } from '@/lib/queryKeys';

export const useSubtasksByTask = (taskId: string) => {
  return useQuery({
    queryKey: queryKeys.subtasks.byTask(taskId),
    queryFn: async () => {
      if (!taskId) throw new Error('Task ID required');
      return subtaskService.getSubtasksByTask(taskId);
    },
    enabled: !!taskId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSubtask = (subtaskId: string) => {
  return useQuery({
    queryKey: queryKeys.subtasks.detail(subtaskId),
    queryFn: async () => {
      if (!subtaskId) throw new Error('Subtask ID required');
      return subtaskService.getSubtask(subtaskId);
    },
    enabled: !!subtaskId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useSubtaskStats = (taskId: string) => {
  return useQuery({
    queryKey: [...queryKeys.subtasks.byTask(taskId), 'stats'],
    queryFn: async () => {
      if (!taskId) throw new Error('Task ID required');
      return subtaskService.getSubtaskStats(taskId);
    },
    enabled: !!taskId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
