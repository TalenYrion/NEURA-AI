'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import UnauthorizedFallback from '@/components/unauthorizedFallback';
import { useAuth } from '@/context/auth-context';
import { useWorkspace } from '@/context/workspace-context';
import { Loader2 } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { state: workspaceState, isLoading: isWorkspaceLoading } = useWorkspace();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isFinishedLoading = !isAuthLoading && !isWorkspaceLoading;

    if (
      isFinishedLoading &&
      user &&
      workspaceState &&
      !workspaceState.hasWorkspace
    ) {
      if (pathname !== '/onboarding') {
        router.replace('/onboarding');
      }
    }
  }, [
    user,
    workspaceState,
    isAuthLoading,
    isWorkspaceLoading,
    pathname,
    router,
  ]);

  // 1. Unified Cyberpunk Core Loading State Frame
  if (isAuthLoading || isWorkspaceLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#0B0F19] text-slate-200 antialiased">
        <div className="relative flex items-center justify-center">
          {/* Outer Ambient Aura Glow */}
          <div className="absolute h-10 w-10 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="h-10 w-10 text-purple-500 animate-spin relative z-10" />
        </div>
        
        <p className="mt-5 text-xs font-mono tracking-widest text-slate-500 uppercase">
          {isAuthLoading ? 'VERIFYING NODE SESSION...' : 'SYNCHRONIZING CORE WORKSPACE...'}
        </p>
      </div>
    );
  }

  // 2. Auth Guard Fail-Safe Layer
  if (!user) {
    return <UnauthorizedFallback />;
  }

  // 3. Onboarding Guard Isolation Trap
  if (!workspaceState?.hasWorkspace && pathname !== '/onboarding') {
    return null;
  }

  return <>{children}</>;
}
