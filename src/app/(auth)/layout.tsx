import React from 'react';
import { Sparkles, Terminal, Cpu, MessageSquare, Wand2 } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#09090b] text-zinc-50 font-sans antialiased selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Left Column: Hyper-Polished AI Visual Showcase */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-[#09090b] p-16 flex-col justify-between overflow-hidden border-r border-zinc-900">
        
        {/* Futuristic Cyber Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#a855f7_1px,transparent_1px),linear-gradient(to_bottom,#a855f7_1px,transparent_1px)] bg-[size:32px_32px]" 
          style={{ maskImage: 'linear-gradient(to bottom, black, transparent)' }}
        />

        {/* Hyper-Glow Deep Neural Mesh Fields */}
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[130px] animate-pulse pointer-events-none duration-[6000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[40%] right-[-20%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Segment: Brand Header */}
        <div className="relative z-10 flex items-center gap-3 font-semibold text-lg tracking-tight text-zinc-100">
          <div className="p-2 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/30">
            <Sparkles className="h-5 w-5 text-white animate-spin-slow" />
          </div>
          <span className="font-black tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            NEURA.AI
          </span>
        </div>

        {/* Middle Segment: Core Value Proposition */}
        <div className="relative z-10 space-y-6 max-w-sm my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-purple-300">Generation v3.5 Engine</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight leading-[1.15] bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Intelligence, <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                generated instantly.
              </span>
            </h1>
            <p className="text-sm font-medium leading-relaxed text-zinc-400">
              Automate multi-model content processing, micro-copy synthesis, and predictive asset scaling from one hyper-fast dashboard interface.
            </p>
          </div>

          {/* Interactive Floating AI Preview Card */}
          <div className="pt-4">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl p-4 shadow-2xl shadow-black/80 space-y-3 ring-1 ring-white/[0.03]">
              <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-mono text-zinc-400">inference_stream.sh</span>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                </div>
              </div>
              
              <div className="space-y-2 font-mono text-[11px] leading-relaxed text-zinc-300">
                <p className="text-zinc-500">&gt; neura-model --stream --tone=premium</p>
                <p className="text-purple-300">
                  ⚡ <span className="text-zinc-100">"The architecture of human knowledge is rewriting itself through digital synapses..."</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] font-medium text-zinc-500">
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> 841 tokens/s</span>
                <span className="text-cyan-400/80 font-bold bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/10">0.002s latency</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Segment: Trust Utility */}
        <div className="relative z-10 flex items-center justify-between border-t border-zinc-900 pt-6 text-[11px] font-medium text-zinc-500">
          <span>Enterprise Cognitive Infrastructure</span>
          <span className="font-mono text-zinc-600">v3.52-LLM</span>
        </div>
      </div>

      {/* Right Column: Main Interactivity / Form Engine Layer */}
      <div className="col-span-1 lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative bg-[#0b0b0d]">
        
        {/* Delicate workspace vignette glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-indigo-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

        {/* Mobile View Top Navigation Header */}
        <div className="flex lg:hidden items-center gap-3 font-bold text-lg tracking-tight absolute top-8 left-8">
          <div className="p-2 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-xl">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-zinc-100 tracking-wider">NEURA.AI</span>
        </div>

        {/* Content Box Core Injector */}
        <div className="w-full max-w-md mx-auto space-y-6 relative z-10">
          <div className="absolute -top-12 -left-12 p-3 bg-purple-500/[0.01] border border-purple-500/[0.03] rounded-full blur-xl pointer-events-none" />
          {children}
        </div>
      </div>
    </div>
  );
}
