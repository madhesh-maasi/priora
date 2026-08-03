import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { taskService } from '../services/taskService';
import { queryKeys } from '@/lib/queryKeys';

export const useTasks = (limit: number = 50, offset: number = 0) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.tasks.list(),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return taskService.getUserTasks(user.id, limit, offset);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useTasksByStatus = (status: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.tasks.byStatus(status),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return taskService.getTasksByStatus(user.id, status);
    },
    enabled: !!user && !!status,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useTasksByCategory = (categoryId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.tasks.byCategory(categoryId),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return taskService.getTasksByCategory(user.id, categoryId);
    },
    enabled: !!user && !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useTask = (taskId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.tasks.detail(taskId),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return taskService.getTask(taskId);
    },
    enabled: !!user && !!taskId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
