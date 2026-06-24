import React from 'react';
import { Activity } from 'lucide-react';
import { DashboardEngineInfo } from '../types';

interface EngineStatusProps {
  engine: DashboardEngineInfo;
}

export function EngineStatusCard({ engine }: EngineStatusProps) {
  return (
    <div className="flex items-center space-x-4 bg-[#0D111A] border border-slate-800/80 p-3 rounded-xl max-w-sm">
      <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-800/50">
        <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
      </div>
      <div>
        <div className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          Model Cluster Status
        </div>
        <div className="text-xs font-semibold text-slate-200 mt-0.5 max-w-[160px] truncate">
          {engine.model}
        </div>
      </div>
    </div>
  );
}
