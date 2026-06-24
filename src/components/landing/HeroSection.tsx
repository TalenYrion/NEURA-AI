'use client';

import Link from 'next/link';
import { ArrowRight, Cpu, Sparkles, Terminal } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-32 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Left Pitch Typography */}
      <div className="lg:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-950/40 border border-purple-800/40 rounded-full">
          <Sparkles className="h-3 w-3 text-purple-400" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300">
            Generation v3.5 Engine Available
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
          Intelligence, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500">
            orchestrated instantly.
          </span>
        </h1>

        <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
          Automate multi-model content processing, cluster configurations, and
          real-time inference streaming via a hyper-tuned localized gateway
          interface.
        </p>

        <div className="pt-4 flex items-center gap-4">
          <Link
            href="/login"
            className="px-6 h-11 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center gap-2"
          >
            Provision Active Node <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Right Terminal Component (Referencing left container aesthetic of Screenshot (334).png) */}
      <div className="lg:col-span-5">
        <div className="w-full bg-[#0D0B18]/50 border border-purple-950/60 rounded-2xl p-5 shadow-2xl relative backdrop-blur-xl group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          {/* Mock Window Controls */}
          <div className="flex items-center justify-between border-b border-purple-950/40 pb-3 mb-4">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-purple-400/70">
              <Terminal className="h-3.5 w-3.5 text-purple-500" />
              <span>inference_stream.sh</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-purple-950" />
              <span className="h-2 w-2 rounded-full bg-purple-900" />
              <span className="h-2 w-2 rounded-full bg-purple-700" />
            </div>
          </div>

          {/* Terminal Terminal Execution Window */}
          <div className="font-mono text-xs space-y-3 leading-relaxed">
            <p className="text-slate-500">{`> neura-model --stream --tone=premium`}</p>
            <div className="p-3 bg-[#07050E]/90 rounded-xl border border-purple-950/40 text-slate-300 relative">
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <p className="text-purple-300">
                ⚡ "The architecture of human knowledge is rewriting itself
                through digital synapses..."
              </p>
            </div>

            {/* Performance Metadata Indicators */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-purple-950/20">
              <span className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-cyan-500/70" /> 841 tokens/s
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/30 text-cyan-400 border border-cyan-900/30 font-semibold">
                0.002s latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
