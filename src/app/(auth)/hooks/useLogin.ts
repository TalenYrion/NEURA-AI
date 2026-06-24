import { useMutation } from '@tanstack/react-query';
import { LoginInput } from '../schemas/loginSchema';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginInput) => authApi.login(data),
    onMutate: () => {
      toast.loading('Logging in...');
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success('Logged in successfully');
      router.push('/onboarding');
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });
}
