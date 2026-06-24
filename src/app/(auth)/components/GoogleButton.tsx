'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { authApi } from '@/lib/api/auth';

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await authApi.googleLogin();
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to initialize Google login');
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={handleGoogleLogin}
      className="w-full rounded-xl py-5 text-xs font-bold uppercase tracking-widest select-none bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200 hover:border-zinc-700 focus-visible:ring-purple-500 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2.5 shadow-md shadow-black/40 relative overflow-hidden group"
    >
      {/* Subtle hover overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/[0.03] to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
      ) : (
        <svg
          className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
          viewBox="0 0 24 24"
        >
          <path
            fill="#EA4335"
            d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.102C18.232 1.926 15.422 1 12.24 1 6.033 1 12.24 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.745-.079-1.32-.176-1.709H12.24z"
          />
        </svg>
      )}

      <span className="relative z-10 tracking-widest">
        {isLoading ? 'Routing Pipeline...' : 'Google Auth Node'}
      </span>
    </Button>
  );
}
