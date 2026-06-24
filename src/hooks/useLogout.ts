
import { useAuth } from "@/context/auth-context"
import { authApi } from "@/lib/api/auth"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function useSignOut () {
	const {refreshUser} = useAuth();
	const router = useRouter()

	return useMutation({
		mutationFn: authApi.logout,
		onSuccess:async () => {
toast.success('logged out Successfully')
router.push('/login')
await refreshUser()

		},
	onError: (error: Error) => {
      toast.error(error.message || 'Failed to sign out. Please try again.');
    },	
	})

}
