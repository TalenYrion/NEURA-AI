import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { WorkspaceSettingsFormValues } from '../schema/settingSchema';
import { settingsApi } from '@/lib/api/settings';

interface UseUpdateWorkspaceProps {
  currentSlug: string;
}

export function useUpdateWorkspace({ currentSlug }: UseUpdateWorkspaceProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (input: WorkspaceSettingsFormValues) =>
      settingsApi.UpdateWorkspace(currentSlug, input),
    onSuccess: (updatedWorkspace) => {
      // 1. Invalidate workspace data layouts across the cache layer
      queryClient.invalidateQueries({ queryKey: ['workspace', currentSlug] });
      queryClient.invalidateQueries({
        queryKey: ['dashboard-data', currentSlug],
      });

      toast.success('Workspace Synced', {
        description: 'Engine configurations and routing parameters updated.',
      });

      // 2. 💡 Handle Route Relocation if the structural slug was altered
      if (updatedWorkspace.slug && updatedWorkspace.slug !== currentSlug) {
        // Smoothly push the browser window context into the new slug domain hierarchy
        router.push(`/${updatedWorkspace.slug}/settings`);
      }
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        'Failed to update workspace node parameters.';
      toast.error('System Exception', { description: errorMsg });
    },
  });
}
