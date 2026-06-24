// src/app/(protected)/[slug]/documents/[id]/page.tsx
'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentViewerCard } from './components/DocumentViewerCard';
import { ChevronLeft, Loader2, ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGetDocumentDetail } from './hooks/useGetDocumentDetails';

interface PageProps {
  params: Promise<{ slug: string; id: string }>;
}

export default function DocumentDetailPage({ params }: PageProps) {
  const { slug, id } = use(params);
  const router = useRouter();
  
  const { data: document, isLoading, isError, error, refetch } = useGetDocumentDetail(slug, id);

  // 1. Loading Telemetry Stream
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4 bg-[#0B0F19]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">Parsing Asset Memory...</p>
      </div>
    );
  }

  // 2. Error Fallback Guard
  if (isError || !document) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 bg-[#0B0F19]">
        <div className="w-full max-w-md p-6 bg-[#0D111A] border border-rose-950/40 rounded-2xl text-center space-y-4">
          <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto" />
          <div>
            <h3 className="text-sm font-semibold text-slate-200 font-mono uppercase">Node Resolution Failure</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {error?.message || 'The requested document address signature is inaccessible in this partition.'}
            </p>
          </div>
          <Button onClick={() => refetch()} variant="outline" className="border-slate-800 text-xs h-9 w-full rounded-xl">
            <RefreshCw className="h-3 w-3 mr-2" /> Re-sync Target Address
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 md:p-8 max-w-5xl mx-auto min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      
      {/* Structural Back Navigation Header Block */}
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
        <button
          onClick={() => router.push(`/${slug}/dashboard`)}
          className="group flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors bg-slate-900/40 border border-slate-800/60 px-3 py-1.5 rounded-xl"
        >
          <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Return to Terminal
        </button>
        
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
          ID: {document.id.slice(0, 8)}...
        </div>
      </div>

      {/* Main Viewport Workspace Component */}
      <DocumentViewerCard document={document} slug={slug} />
    </div>
  );
}
