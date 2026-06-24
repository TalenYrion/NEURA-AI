'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Sparkles,
  Settings,
  Terminal,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './components/MobileSidebar';
import { UserDropdown } from './components/UserDropdown';
import { useParams, usePathname } from 'next/navigation';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const params = useParams();
  const segments = pathname.split('/');
  const slug = (params?.slug as string) || pathname.split('/')[1] || '';

  console.log('layout slug: ', slug);
  const navItems = [
    { label: 'Dashboard', href: `/${slug}/dashboard`, icon: LayoutDashboard },
    { label: 'AI Content Engine', href: `/${slug}/generate`, icon: Sparkles },
    { label: 'System Settings', href: `/${slug}/settings`, icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-slate-200 antialiased selection:bg-blue-500/30 selection:text-white">
      {/* 1. Desktop Mode Static Anchored Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0D111A] border-r border-slate-800/80 z-20 h-screen fixed top-0 left-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800/60 gap-2.5 shrink-0">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
            <Terminal className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-sm text-slate-50 uppercase">
            Workspace{' '}
            <span className="text-blue-500 font-mono text-xs ml-0.5">Core</span>
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 mt-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-[#162031] text-blue-400 border border-blue-500/20 shadow-md shadow-blue-950/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#131924]/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'}`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-3.5 w-3.5 opacity-80" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 2. Responsive Mobile Overlay Drawer Wrapper */}
      <MobileSidebar
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navItems={navItems}
        pathname={pathname}
        slug={slug}
      />

      {/* 3. Global Canvas Content Container */}
      <div className="flex flex-col flex-1 min-w-0 md:pl-64">
        {/* Global Toolbar Header Bar */}
        <header className="h-16 border-b border-slate-800/60 bg-[#0D111A]/80 backdrop-blur-md flex items-center justify-between px-6 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden text-slate-400 hover:bg-slate-900 border border-slate-800 h-9 w-9 rounded-xl"
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Dynamic Breadcrumb Node Path Tracker */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <span>Workspaces</span>
              <span className="text-slate-700">/</span>
              <span className="text-slate-300 max-w-[120px] truncate capitalize font-semibold">
                {slug.replace(/-/g, ' ')}
              </span>
            </div>
          </div>

          {/* Profile Dropdown Execution Node Container */}
          <div className="flex items-center space-x-4">
            <UserDropdown />
          </div>
        </header>

        {/* Secondary Viewport Workspace Frame */}
        <main className="flex-1 bg-[#0B0F19]">{children}</main>
      </div>
    </div>
  );
}
