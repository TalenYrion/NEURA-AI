// src/components/layout/MobileSidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { X, Terminal, ChevronRight, LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  pathname: string;
  slug: string;
}

export function MobileSidebar({ isOpen, onClose, navItems, pathname, slug }: MobileSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop Ambient Blur Barrier Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Floating Panel Box Container */}
      <aside className="fixed top-0 left-0 bottom-0 w-72 bg-[#0D111A] border-r border-slate-800/80 p-4 flex flex-col space-y-6 shadow-2xl animate-in slide-in-from-left duration-200">
        
        {/* Header Action Partition Area */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Terminal className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-sm text-slate-50 uppercase">
              Workspace <span className="text-blue-500 font-mono text-xs">Core</span>
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Links Routing Collection */}
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#162031] text-blue-400 border border-blue-500/20 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131924]/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-80" />}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
