import Link from 'next/link';
import { ArrowRight, Bot, LayoutDashboard } from 'lucide-react';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07050E] text-slate-200 overflow-x-hidden relative selection:bg-purple-500/30 selection:text-white">
      {/* Structural Ambient Background Grid & Radial Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d08_1px,transparent_1px),linear-gradient(to_bottom,#1f293d08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60vh] right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-purple-950/20 bg-[#07050E]/60 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="font-mono font-bold tracking-wider text-white text-lg">
              NEURA.AI
            </span>
          </div>

          {/* Action Button Cluster */}
          <div className="flex items-center gap-3">
            {/* 💡 NEW: Direct Onboarding Portal for Authenticated Users */}
            <Link
              href="/onboarding"
              className="group flex items-center gap-1.5 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.2)]"
            >
              <LayoutDashboard className="h-3 w-3" />
              Go to Onboarding
            </Link>

            <Link
              href="/login"
              className="group flex items-center gap-1.5 px-4 py-1.5 bg-purple-900/40 hover:bg-purple-800 text-purple-100 border border-purple-700/40 text-xs font-mono rounded-xl transition-all shadow-lg"
            >
              Access Panel
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Framework View */}
      <main className="relative z-10">
        <HeroSection />
        <FeatureGrid />
      </main>

      {/* Footer Element */}
      <footer className="border-t border-purple-950/30 bg-[#040308] py-8 text-center text-[11px] font-mono text-slate-500">
        <p>Enterprise Cognitive Infrastructure // v3.52-LLM Matrix Suite</p>
        <a
          href="https://www.flaticon.com/free-icons/cyberpunk"
          title="cyberpunk icons"
          className="hover:text-purple-400 transition-colors mt-1 inline-block"
        >
          Cyberpunk icons created by manshagraphics - Flaticon
        </a>
      </footer>
    </div>
  );
}
