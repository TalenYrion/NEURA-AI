// src/app/(protected)/[slug]/documents/[id]/components/DocumentViewerCard.tsx
'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Copy,
  Check,
  FileText,
  Calendar,
  Cpu,
  Layers,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';
import { DocumentResponse } from '../../../dashboard/types';
import { useDeleteDocument } from '../hooks/useDeleteDocuments';

interface DocumentViewerCardProps {
  document: DocumentResponse;
  slug: string;
}

export function DocumentViewerCard({
  document,
  slug,
}: DocumentViewerCardProps) {
  const [copied, setCopied] = useState(false);
  const deleteMutation = useDeleteDocument(slug);

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(document.content || '');
      setCopied(true);
      toast.success('System Clipboard Updated', {
        description: 'Asset stream buffer string copied successfully.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Clipboard Access Denied');
    }
  };

  const handleDelete = () => {
    if (
      confirm('Are you sure you want to permanently delete this asset node?')
    ) {
      deleteMutation.mutate(document.id);
    }
  };

  return (
    <div className="bg-[#0D111A]/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* Card Header Parameters Panel */}
      <div className="p-6 border-b border-slate-800/60 bg-[#0E1321]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono tracking-wider text-slate-500">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              <Calendar className="h-3 w-3 text-slate-600" />
              <span>{new Date(document.createdAt).toLocaleString()}</span>
            </div>
            {document.toolType && (
              <div className="flex items-center gap-1 text-blue-400 bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 rounded">
                <Cpu className="h-2.5 w-2.5" />
                <span className="uppercase">
                  {document.toolType.replace(/-/g, ' ')}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              <Layers className="h-3 w-3 text-slate-600" />
              <span>{document.wordCount || 0} WORDS</span>
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 select-all truncate">
            {document.title || 'Untitled Stream Log'}
          </h1>
        </div>

        {/* Action Controls Flex Matrix */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            onClick={handleCopyContent}
            className="flex items-center justify-center gap-2 text-xs font-mono h-9 px-4 rounded-xl border border-slate-800 bg-[#0B0F19] hover:bg-slate-900 hover:border-slate-700 text-slate-300 active:scale-[0.98] transition-all min-w-[120px]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" />
                <span>Copy Stream</span>
              </>
            )}
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex items-center justify-center gap-2 text-xs font-mono h-9 px-4 rounded-xl border border-rose-950/40 bg-rose-950/10 hover:bg-rose-950/20 text-rose-400 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>{deleteMutation.isPending ? 'Purging...' : 'Delete'}</span>
          </button>
        </div>
      </div>

      {/* Main Text Content Body Frame */}
      <div className="p-6 md:p-8 bg-slate-950/20">
        {document.content ? (
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 select-text selection:bg-blue-500/20 selection:text-blue-200">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  const codeRawStr = String(children).replace(/\n$/, '');

                  return !inline && match ? (
                    <CodeBlockWindow
                      language={language}
                      rawCode={codeRawStr}
                      {...props}
                    />
                  ) : (
                    <code
                      className="bg-slate-800/60 border border-slate-700/40 text-blue-300 px-1.5 py-0.5 rounded text-[11px] font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {document.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-600 space-y-2 font-mono">
            <FileText className="h-6 w-6 stroke-[1.2]" />
            <span className="text-xs">
              This document contains zero token data arrays.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface CodeBlockWindowProps {
  language: string;
  rawCode: string;
}

function CodeBlockWindow({
  language,
  rawCode,
  ...props
}: CodeBlockWindowProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents selection layer mutations inside the main card container
    try {
      await navigator.clipboard.writeText(rawCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy execution script payload:', err);
    }
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0A0E17] font-mono">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F1420] text-[10px] text-slate-400 border-b border-slate-800/80 select-none">
        <span className="uppercase tracking-wider font-semibold text-blue-400">
          {language}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <div className="flex gap-1.5 ml-1">
            <span className="w-2 h-2 rounded-full bg-slate-700/60" />
            <span className="w-2 h-2 rounded-full bg-slate-700/60" />
            <span className="w-2 h-2 rounded-full bg-slate-700/60" />
          </div>
        </div>
      </div>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: 'transparent',
          fontSize: '11px',
        }}
        {...props}
      >
        {rawCode}
      </SyntaxHighlighter>
    </div>
  );
}
