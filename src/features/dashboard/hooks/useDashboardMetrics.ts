import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/features/auth';
import { dashboardService } from '../services/dashboardService';
import { queryKeys } from '@/lib/queryKeys';

export const useDashboardMetrics = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.dashboard.metrics(),
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      return dashboardService.getDashboardMetrics(user.id);
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
