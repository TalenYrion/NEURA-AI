import apiClient from '../api-client';
import {
  OnboaringInput,
  UserStateResponce,
  WorkspaceResponse,
} from '@/app/(protected)/onboarding/types';

export const onboardingApi = {
  userState: async (): Promise<UserStateResponce> => {
    const response = await apiClient.get('workspace/user-state');
    return response.data;
  },

  createWorkspace: async (
    input: OnboaringInput,
  ): Promise<WorkspaceResponse> => {
    const response = await apiClient.post('workspace/create', input);
    return response.data;
  },

};
