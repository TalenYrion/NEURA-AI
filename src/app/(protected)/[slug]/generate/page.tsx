'use client';

import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { generateFormSchema, GenerateFormValues } from './schemas/aiSchema';
import { dashboardApi } from '@/lib/api/dashboard'; // Adjust path to your API utility file

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Sparkles, Loader2, SquareTerminal } from 'lucide-react';

import { ConfigurationFields } from './components/ConfigurationFields';
import { OutputTerminal } from './components/OutputTerminal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ContentGenerationPage({ params }: PageProps) {
  const { slug } = use(params);
  const queryClient = useQueryClient();

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');

  // Replace your old form initialization block with this:
  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onSubmit', // 💡 Tells React Hook Form exactly when to parse validation schemas
    defaultValues: {
      title: '',
      prompt: '',
      toolType: 'blog-post',
      creativity: [0.7],
    },
  });

  function onSubmit(values: GenerateFormValues) {
    setIsStreaming(true);
    setStreamedContent('');
    toast.info('Establishing proxy channel with Groq cluster...');

    // 💡 Invoke your streaming API passing clean callbacks
    const closeConnection = dashboardApi.streamAi(
      slug,
      values.prompt,
      (chunk: string) => {
        // onChunk callback: append character tokens to your state hook
        setStreamedContent((prev) => prev + chunk);
      },
      () => {
        // onComplete callback: run cleanup tasks
        setIsStreaming(false);
        toast.success('Document compiled and auto-saved successfully.');

        // Invalidate stale metrics counters on your dashboard view ⚡
        queryClient.invalidateQueries({
          queryKey: ['workspace', slug, 'stats'],
        });
      },
    );

    // Stop connection if user changes page mid-stream
    return () => closeConnection();
  }

  return (
    <div className="grid lg:grid-cols-5 min-h-[calc(100vh-4rem)] bg-[#0B0F19]">
      {/* Left Settings & Config Grid Matrix (2 Columns) */}
      <div className="lg:col-span-2 border-r border-slate-800/60 p-6 space-y-6 bg-[#0D111A]/40 overflow-y-auto">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Generation Node
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">
            Orchestrate Engine
          </h2>
          <p className="text-xs text-slate-500">
            Configure weights to direct compilation streams to your isolated
            workspace cluster.
          </p>
        </div>

        {/* 💡 Replaced legacy <Form> component context wrapper with a standard form element */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <ConfigurationFields form={form} />

          <Button
            type="submit"
            disabled={isStreaming}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm h-10 shadow-lg shadow-blue-950/40 transition-all"
          >
            {isStreaming ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Ingesting
                Vectors...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" /> Ignite Content Engine
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Right Stream Terminal Frame Viewport (3 Columns) */}
      <div className="lg:col-span-3 flex flex-col p-6 bg-[#090D16] min-w-0">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <SquareTerminal className="h-3.5 w-3.5 text-slate-500" />
            Live Buffer Output Channel
          </div>
          {isStreaming && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 px-2.5 py-0.5 rounded-full animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Ingesting Chunks
            </div>
          )}
        </div>

        <OutputTerminal content={streamedContent} />
      </div>
    </div>
  );
}
