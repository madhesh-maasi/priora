import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { dashboardService } from '../services/dashboardService';
import { queryKeys } from '@/lib/queryKeys';

export const useUpcomingTasks = (days: number = 7) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.dashboard.upcomingTasks(days),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return dashboardService.getUpcomingTasks(user.id, days);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
