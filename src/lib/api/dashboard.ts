import { DashboardStatsResponse } from '@/app/(protected)/[slug]/dashboard/types';
import apiClient from '../api-client';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export const dashboardApi = {
  getDashboardData: async (slug: string): Promise<DashboardStatsResponse> => {
    const response = await apiClient.get(`workspace/${slug}/dashboard-data`);
    return response.data;
  },

  // inside your api client / service folder
  streamAi: (
    slug: string,
    prompt: string,
    onChunk: (content: string) => void,
    onComplete?: () => void,
  ) => {
    console.log('slug: ', slug);
    const token = localStorage.getItem('access_token') || '';
    const url = `${process.env.NEXT_PUBLIC_API_URL}/workspace/${slug}/ai/stream`;
    // Create an AbortController so you can cleanly terminate the stream if the component unmounts
    const ctrl = new AbortController();

    fetchEventSource(url, {
      method: 'POST', // 💡 Can be POST now, meaning your prompt doesn't get cut off by long URL limits!
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // 💡 Passes cleanly through backend auth guards
      },
      credentials: 'include',
      body: JSON.stringify({ prompt }),
      signal: ctrl.signal,

      async onmessage(event) {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.done) {
            if (onComplete) onComplete();
            ctrl.abort(); // Close stream gracefully
            return;
          }
          onChunk(parsed.content);
        } catch (error) {
          console.error('Failed parsing incoming stream frame buffer:', error);
          ctrl.abort();
        }
      },

      onerror(err) {
        console.error('AI Stream handshake interrupted:', err);
        ctrl.abort();
        throw err; // Rethrow to let fetch-event-source know not to endlessly retry automatically
      },
    });

    // Return the cleanup function to terminate connection if user navigates away
    return () => ctrl.abort();
  },
};
