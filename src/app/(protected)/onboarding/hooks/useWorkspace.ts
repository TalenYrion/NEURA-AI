import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { OnboardingInput } from '../schemas/workSpaceSchema';
import { onboardingApi } from '@/lib/api/onboarding';

export function useWorkspace() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: OnboardingInput) => onboardingApi.createWorkspace(data),

    onMutate: () => {
      const toastId = toast.loading('Onboarding your workspace...');
      return { toastId };
    },

    onSuccess: async (data, variables, context) => {
      toast.success('Onboarded successfully!', { id: context?.toastId });
      await queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      await queryClient.refetchQueries({ queryKey: ['workspaces'] });
      const slug = data.slug;
      router.push(`/${slug}/dashboard`);
      window.location.href = `/onboarding`;
    },

    onError: (error: any, variables, context) => {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        'Failed to create workspace';
      toast.error(errorMessage, { id: context?.toastId });
    },
  });
}
