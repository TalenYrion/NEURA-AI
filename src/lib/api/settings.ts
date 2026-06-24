import {
  UserProfileResponse,
  WorkspaceUpdateResponse,
} from '@/app/(protected)/[slug]/settings/types';
import apiClient from '../api-client';

export const settingsApi = {
  // 💡 Updated endpoint path from 'user/update' to 'user/profile' to match backend controller
  updateUserName: async (fullName: string): Promise<UserProfileResponse> => {
    const response = await apiClient.patch<UserProfileResponse>(
      'user/profile',
      { fullName },
    );
    return response.data;
  },

  UpdateWorkspace: async (
    currentSlug: string,
    payload: { name?: string; slug?: string; selectedModel?: string },
  ): Promise<WorkspaceUpdateResponse> => {
    console.log('slug current: ', currentSlug);
    const response = await apiClient.patch<WorkspaceUpdateResponse>(
      `workspace/${currentSlug}/update`,
      payload,
    );
    return response.data;
  },
};
