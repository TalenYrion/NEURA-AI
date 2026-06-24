import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { documentApi } from '@/lib/api/document';
import { DocumentResponse } from '../../../dashboard/types';

export function useGetDocumentDetail(slug: string, documentId: string) {
  return useQuery<DocumentResponse, Error>({
    queryKey: ['workspace', slug, 'documents', documentId],
    queryFn: async () => {
      try {
        return await documentApi.getSingleDocument(slug, documentId);
      } catch (error: any) {
        const errorMsg =
          error?.response?.data?.message || 'Failed to fetching document.';

        toast.error('Data Sync Failure', {
          description: errorMsg,
        });

        throw error; // Propagate up so the UI component registers 'isError: true'
      }
    },
    retry: 1,
    staleTime: 0,
    gcTime: 0,
  });
}
