
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DashboardStatsResponse, DocumentResponse } from '../types';
import { documentApi } from '@/lib/api/document';

export function useGetDocuments(slug: string) {
  return useQuery<DocumentResponse[], Error>({
    queryKey: ['workspace',slug, 'documents'],
    queryFn: async () => {
      try {
        return await documentApi.getDocumentsList(slug);
      } catch (error: any) {
        const errorMsg =
          error?.response?.data?.message ||
          'Failed to load documents.';

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
