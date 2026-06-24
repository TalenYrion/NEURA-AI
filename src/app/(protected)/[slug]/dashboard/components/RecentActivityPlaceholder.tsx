'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ArrowUpRight, Calendar, Cpu } from 'lucide-react';
import { DocumentResponse } from '../types'; // Adjust import to your Document response interface path

interface RecentDocumentsListProps {
  documents: DocumentResponse[] | undefined;
  isLoading: boolean;
  slug: string;
}

export function RecentDocumentsList({ documents, isLoading, slug }: RecentDocumentsListProps) {
  const router = useRouter();

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-44 rounded-2xl border border-slate-800/60 bg-[#0D111A]/20 p-5 animate-pulse space-y-4">
            <div className="h-4 w-1/3 bg-slate-800 rounded" />
            <div className="h-5 w-3/4 bg-slate-700 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-800 rounded" />
              <div className="h-3 w-5/6 bg-slate-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. Clear Empty Fallback State
  if (!documents || documents.length === 0) {
    return (
      <div className="h-72 rounded-2xl border border-dashed border-slate-800/80 flex items-center justify-center p-6 bg-[#0D111A]/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="text-center space-y-2 relative z-10">
          <FileText className="h-8 w-8 text-slate-700 mx-auto stroke-[1.5]" />
          <p className="text-sm text-slate-400 font-medium tracking-tight">No active orchestration streams found</p>
          <p className="text-xs text-slate-600 max-w-sm mx-auto leading-normal">
            Assets generated inside this tenant space partition will populate metrics and layout cards here in real-time.
          </p>
        </div>
      </div>
    );
  }

  // 3. Document Data Engine Feed Render
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          Recent Generated Assets
        </h2>
        <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
          Node Count: {documents.length}
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => router.push(`/${slug}/documents/${doc.id}`)}
            className="group relative flex flex-col justify-between p-5 h-44 rounded-2xl border border-slate-800/60 bg-[#0D111A]/30 hover:bg-[#0D111A]/60 hover:border-blue-500/40 transition-all duration-300 cursor-pointer overflow-hidden selection:bg-transparent"
          >
            {/* Subtle interactive glow corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="space-y-2.5 min-w-0">
              {/* Header Meta Elements */}
              <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-600" />
                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                </div>
                {doc.toolType && (
                  <div className="flex items-center gap-1 text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 rounded-md">
                    <Cpu className="h-2.5 w-2.5" />
                    <span className="capitalize">{doc.toolType.replace(/-/g, ' ')}</span>
                  </div>
                )}
              </div>

              {/* Document Title */}
              <h3 className="font-semibold text-sm text-slate-200 tracking-tight group-hover:text-blue-400 transition-colors truncate pr-4">
                {doc.title || 'Untitled Document'}
              </h3>

              {/* Text Preview Body */}
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-sans font-normal">
                {doc.content || 'No text generated inside this asset array structure.'}
              </p>
            </div>

            {/* Bottom Counter Footer Anchor */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/30 text-[10px] font-mono text-slate-500">
              <span>{doc.wordCount || 0} WORDS</span>
              <ArrowUpRight className="h-3 w-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
