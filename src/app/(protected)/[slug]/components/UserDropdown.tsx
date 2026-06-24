// src/components/layout/UserDropdown.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Mail, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useSignOut } from '@/hooks/useLogout';

export function UserDropdown() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 💡 Instantiate your custom logout mutation
  const signOutMutation = useSignOut();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.fullname
    ? user.fullname.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : (user.email || 'US').slice(0, 2).toUpperCase();

  const handleDisconnect = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Interactive Avatar Circle Token */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 rounded-full border border-slate-800 bg-[#131924] flex items-center justify-center cursor-pointer hover:border-slate-600 transition-all focus:outline-none ring-2 ring-transparent focus:ring-blue-500/40"
      >
        <span className="text-xs font-mono font-bold text-slate-300">{initials}</span>
      </button>

      {/* Dropdown Floating Absolute Drawer Block */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#0D111A] border border-slate-800/90 rounded-2xl shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all p-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Identity Parameters Summary Node */}
          <div className="px-4 py-3 border-b border-slate-800/50 space-y-1">
            <p className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3" /> Secure Node Identity
            </p>
            <p className="text-sm font-semibold text-slate-200 truncate">{user.fullname || 'Operator Key'}</p>
            <p className="text-xs text-slate-500 truncate flex items-center gap-1">
              <Mail className="h-2.5 w-2.5" /> {user.email}
            </p>
          </div>

          {/* Actions Link Cluster */}
          <div className="p-1 mt-1">
            <Button
              variant="ghost"
              disabled={signOutMutation.isPending}
              onClick={handleDisconnect}
              className="w-full justify-start text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl h-9 text-xs font-mono tracking-wider group transition-all disabled:opacity-50"
            >
              {signOutMutation.isPending ? (
                <Loader2 className="h-3.5 w-3.5 mr-2 text-rose-400 animate-spin" />
              ) : (
                <LogOut className="h-3.5 w-3.5 mr-2 text-slate-500 group-hover:text-rose-400 transition-colors" />
              )}
              {signOutMutation.isPending ? 'TERMINATING...' : 'DISCONNECT NODE'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
