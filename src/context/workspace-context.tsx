'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onboardingApi } from '@/lib/api/onboarding'; // Adjust path based on your lib folder
import { useAuth } from './auth-context'; // To react to the user logging out/in
import { UserStateResponce } from '@/app/(protected)/onboarding/types';

interface WorkspaceContextType {
  state: UserStateResponce | null;
  isLoading: boolean;
  refreshWorkspaceState: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth(); // Destructure auth to sync workspace states if user sessions switch
  const [state, setState] = useState<UserStateResponce | null>(null);
  const [isLoading, setLoading] = useState(true);

  const refreshWorkspaceState = async () => {
    if (!user) {
      setState(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await onboardingApi.userState();
      setState(data);
    } catch {
      setState({
        hasWorkspace: false,
        redirectTo: '/onboarding',
      });
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch the verified multi-tenant state whenever the primary auth profile shifts
  useEffect(() => {
    refreshWorkspaceState();
  }, [user]);

  return (
    <WorkspaceContext.Provider
      value={{
        state,
        isLoading,
        refreshWorkspaceState,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};
