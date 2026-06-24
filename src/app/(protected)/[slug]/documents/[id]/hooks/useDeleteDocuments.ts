import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { documentApi } from '@/lib/api/document';
import { useRouter } from 'next/navigation';

export function useDeleteDocument(slug: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (documentId: string) => documentApi.deleteDocument(slug, documentId),
    onSuccess: () => {
      toast.success('Asset Purged', {
        description: 'The document record has been wiped from the environment partition.',
      });
      
      // 💡 Invalidate the document list query cache node to trigger a fresh background reload
      queryClient.invalidateQueries({ queryKey: ['workspace', slug, 'documents'] });
      
      // Redirect back to dashboard since this file no longer exists
      router.push(`/${slug}/dashboard`);
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || 'Failed to delete asset.';
      toast.error('System Exception', { description: errorMsg });
    },
  });
}
