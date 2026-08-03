import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { dashboardService } from '../services/dashboardService';
import { queryKeys } from '@/lib/queryKeys';

export const useOverdueTasks = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.dashboard.overdueTasks(),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return dashboardService.getOverdueTasks(user.id);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
