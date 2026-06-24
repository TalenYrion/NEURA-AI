// src/components/auth/UnauthorizedFallback.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnauthorizedFallback() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0B0F19] px-4 py-12 antialiased selection:bg-purple-500/30 selection:text-white">
      <div className="w-full max-w-md text-center">
        {/* Glow-Enhanced Vault Shield Node */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-purple-900/30 to-indigo-950/20 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-950/40 relative group">
          <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl transition-all group-hover:bg-purple-500/20" />
          <ShieldAlert className="h-7 w-7 relative z-10 animate-pulse" />
        </div>

        {/* Text Systems Matrix */}
        <h2 className="mt-6 text-xl font-bold tracking-tight text-slate-50 font-sans uppercase">
          Access Denied{' '}
          <span className="text-purple-500 font-mono text-xs ml-0.5">401</span>
        </h2>

        <p className="mt-3 text-xs font-mono text-slate-400 max-w-xs mx-auto tracking-wide leading-relaxed">
          AUTHORIZATION TOKEN NOT DETECTED. PLEASE AUTHENTICATE YOUR SESSION
          ROUTE TO ACCESS CREATOR MODULE DATA.
        </p>

        {/* Action Node Links Grid */}
        <div className="mt-8 space-y-3 px-4">
          {/* Core Action: Sign In Trigger */}
          <Link href="/login" passHref legacyBehavior>
            <Button className="w-full justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-slate-50 font-mono text-xs font-bold tracking-wider hover:from-purple-500 hover:to-indigo-500 transition-all border border-purple-400/20 shadow-md shadow-purple-950/50 h-11">
              CONNECT SECURE NODE
            </Button>
          </Link>

          {/* Secondary Action: Return Home */}
          <Link href="/" passHref legacyBehavior>
            <Button
              variant="ghost"
              className="w-full justify-center rounded-xl border border-slate-800/80 bg-[#131924]/30 text-slate-400 hover:text-slate-200 hover:bg-[#131924]/70 transition-all font-mono text-xs tracking-wider h-11"
            >
              RETURN TO MAIN
            </Button>
          </Link>
        </div>

        {/* System Operations Support Link */}
        <p className="mt-10 text-[11px] font-mono text-slate-500 tracking-wider">
          TROUBLE DECRYPTING CREDENTIALS?{' '}
          <Link
            href="/support"
            className="text-purple-400 underline hover:text-purple-300 transition-colors"
          >
            CONTACT HUB SUPPORT
          </Link>
        </p>
      </div>
    </div>
  );
}
