'use client';

import React, { use } from 'react';
import { MetricGrid } from './components/MetricGrid';
import { ShieldAlert, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardStats } from './hooks/useGetDashboardStats';
import { EngineStatusCard } from './components/EngineStatusCard';
import { useGetDocuments } from './hooks/useGetDocumnets';
import { RecentDocumentsList } from './components/RecentActivityPlaceholder';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DashboardPage({ params }: PageProps) {
  const { slug } = use(params);
  
  // 🔄 Parallel query synchronization fetches metrics and records simultaneously
  const { data, isLoading: isStatsLoading, isError: isStatsError, error: statsError, refetch: refetchStats } = useDashboardStats(slug);
  const { data: documents, isLoading: isDocsLoading } = useGetDocuments(slug);

  const isLoading = isStatsLoading;
  const isError = isStatsError;

  // 1. Loading Telemetry Screen
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4 bg-[#0B0F19]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">Synchronizing Telemetry...</p>
      </div>
    );
  }

  // 2. Access Denied / Error Safeguard Barrier
  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 bg-[#0B0F19]">
        <div className="w-full max-w-md p-6 bg-[#0D111A] border border-rose-950/40 rounded-2xl shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-rose-500/30" />
          <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto" />
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold text-slate-200 tracking-tight">Security Cluster Exception</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
              {statsError?.message || 'Access authorization matching this token block signature could not be verified.'}
            </p>
          </div>
          <Button 
            onClick={() => refetchStats()} 
            variant="outline" 
            className="border-slate-800 hover:bg-slate-900/50 text-slate-300 rounded-xl text-xs h-9"
          >
            <RefreshCw className="h-3 w-3 mr-2" /> Retry Handshake
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-8 max-w-7xl mx-auto min-h-screen bg-[#0B0F19] text-slate-100">
      
      {/* Top Header Grid Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6 relative">
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 rounded w-max">
            Node Matrix Connected
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50 capitalize mt-2">
            {data.name || slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-sm text-slate-400">
            Dedicated system metrics and file resource allocation maps.
          </p>
        </div>
        
        {/* Isolated Engine View Box Component */}
        <EngineStatusCard engine={data.engine} />
      </div>

      {/* Numerical Data Analytic Layout Matrix Component */}
      <MetricGrid metrics={data.metrics} />

      {/* 💡 Replaced placeholder with the clean, reactive documents workspace map */}
      <RecentDocumentsList 
        documents={documents} 
        isLoading={isDocsLoading} 
        slug={slug} 
      />
    </div>
  );
}
