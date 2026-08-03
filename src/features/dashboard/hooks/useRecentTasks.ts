import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { dashboardService } from '../services/dashboardService';
import { queryKeys } from '@/lib/queryKeys';

export const useRecentTasks = (limit: number = 5) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.dashboard.recentTasks(limit),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return dashboardService.getRecentTasks(user.id, limit);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
