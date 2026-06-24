import { Cpu, LayoutDashboard, Route, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Route,
    title: 'Dynamic Slug Provisioning',
    desc: 'Autonomous URL generation that auto-calculates multi-tenant parameters without breaking active socket handshakes.',
    color: 'text-purple-400',
  },
  {
    icon: Cpu,
    title: 'Multi-Model Edge Selection',
    desc: 'Instantly cycle pipelines between Llama 3.3 SpecDec, ultra-fast local engines, and dedicated logical reasoning endpoints.',
    color: 'text-cyan-400',
  },
  {
    icon: LayoutDashboard,
    title: 'Unified Control Matrix',
    desc: 'A gorgeous client console utilizing isolated layout forms to manage user and system operations asynchronously.',
    color: 'text-indigo-400',
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 border-t border-purple-950/20">
      <div className="space-y-2 mb-12">
        <h2 className="text-xs font-mono tracking-widest uppercase text-purple-400 font-semibold">
          Core Engine Specifications
        </h2>
        <p className="text-xl font-bold tracking-tight text-white">
          Architected for performance portfolio showcases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D0B18]/30 border border-purple-950/40 relative overflow-hidden group hover:border-purple-800/40 transition-all backdrop-blur-sm"
            >
              {/* Subtle top glow bar visible on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/0 group-hover:via-purple-500/40 to-transparent transition-all" />

              <div className="p-2.5 w-10 h-10 rounded-xl bg-[#07050E] border border-purple-950/60 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="font-mono text-sm font-semibold tracking-wide text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
