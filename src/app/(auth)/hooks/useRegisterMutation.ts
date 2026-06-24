import { useMutation } from '@tanstack/react-query';
import { RegisterInput } from '../schemas/registerSchema';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: RegisterInput) => authApi.register(formData),
    onMutate: () => {
      toast.loading('Creating your account...');
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success('Account created successfully!');
      router.push('/login');
    },
    onError: (error: Error) => {
      toast.dismiss();
      toast.error(error.message || 'Something went wrong.');
    },
  });
}
