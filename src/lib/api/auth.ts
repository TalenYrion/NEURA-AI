import { LoginInput, RegisterInput, UserResponse } from '@/app/(auth)/types';
import apiClient from '../api-client';

export const authApi = {
  register: async (data: RegisterInput): Promise<UserResponse> => {
    const response = await apiClient.post('/user', data);
    return response.data;
  },
  login: async (data: LoginInput): Promise<UserResponse> => {
    const response = await apiClient.post('/auth/sign-in', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/sign-out');
  },

  refreshSession: async (): Promise<UserResponse> => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
  },

  googleLogin: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
    }
  },

  getMe: async (): Promise<UserResponse> => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
};
