import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UserProfileFormValues } from '../schema/settingSchema';
import { settingsApi } from '@/lib/api/settings';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UserProfileFormValues) =>
      settingsApi.updateUserName(input.fullName),
    onSuccess: (data) => {
      // 💡 FIX 1: Invalidate your user profile query cache keys so the frontend navigation re-renders instantly
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // 💡 FIX 2: Corrected the success message from "Purged" to "Updated"
      toast.success('Profile Updated', {
        description:
          'Your user profile details have been synchronized successfully.',
      });
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message ||
        'Failed to update User profile assets.';
      toast.error('System Exception', { description: errorMsg });
    },
  });
}
