import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DashboardStatsResponse } from '../types';
import { dashboardApi } from '@/lib/api/dashboard';

export function useDashboardStats(slug: string) {
  return useQuery<DashboardStatsResponse, Error>({
    queryKey: ['workspace', slug, 'stats'],
    queryFn: async () => {
      try {
        return await dashboardApi.getDashboardData(slug);
      } catch (error: any) {
        const errorMsg =
          error?.response?.data?.message ||
          'Failed to sync workspace telemetry.';

        toast.error('Data Sync Failure', {
          description: errorMsg,
          id: `dashboard-error-${slug}`, // Prevents duplicate spam toast cards
        });

        throw error; // Propagate up so the UI component registers 'isError: true'
      }
    },
    enabled: !!slug,
    retry: 1,
  });
}
