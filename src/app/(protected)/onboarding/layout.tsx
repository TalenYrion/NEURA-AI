'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '@/context/workspace-context';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state, isLoading } = useWorkspace();
  const router = useRouter();

  useEffect(() => {
    // Once data finishes loading, if they already possess a workspace environment, automatically bounce them out
    if (!isLoading && state?.hasWorkspace && state.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [isLoading, state, router]);

  // 1. Premium Dark-Themed Loading State
  if (isLoading || state?.hasWorkspace) {
    return (
      <div className="min-h-screen w-full bg-[#0B0F19] flex flex-col items-center justify-center relative overflow-hidden font-sans">
        {/* Ambient background glow grids */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="flex flex-col items-center space-y-6 z-10 scale-95 animate-fade-in">
          {/* Animated Spinner Track */}
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
            <div className="absolute inset-0 rounded-full border-2 border-t-blue-500 border-r-blue-500/30 animate-spin" />
          </div>

          {/* Microtext Context Indicators */}
          <div className="text-center space-y-1.5">
            <h3 className="text-slate-200 text-sm font-medium tracking-wide">
              {state?.hasWorkspace
                ? 'Redirecting to workspace...'
                : 'Synchronizing environment...'}
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Please wait a moment
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Safe-pass execution: The user is genuinely new, render the inner child onboarding forms
  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-slate-100 flex items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1f293d10_1px,transparent_1px),linear-gradient(to_bottom,#1f293d10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <main className="w-full max-w-md mx-auto p-6 relative z-10">
        {children}
      </main>
    </div>
  );
}
