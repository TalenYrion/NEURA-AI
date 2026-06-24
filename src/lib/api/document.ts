import { DocumentResponse } from "@/app/(protected)/[slug]/dashboard/types"
import apiClient from "../api-client"


export const documentApi = {
	getDocumentsList: async (slug: string): Promise<DocumentResponse[]> => {
    // 💡 Pass the slug context in the headers so your backend guard can grab it!
    const response = await apiClient.get(`documents/recent?slug=${slug}`);
    return response.data;
  },

getSingleDocument: async (slug: string, documentId: string): Promise<DocumentResponse> => {
    // 💡 Fixed URL format to target the dynamic ID route parameter on your NestJS controller
    const response = await apiClient.get(`documents/${documentId}?slug=${slug}`);
    return response.data;
  },
deleteDocument: async (slug: string, documentId: string): Promise<{ success: boolean }> => {
  const response = await apiClient.delete(`documents/${documentId}?slug=${slug}`);
  return response.data;
}
}
