import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileText, Cpu, Disc } from 'lucide-react';
import { DashboardMetrics } from '../types';

interface MetricGridProps {
  metrics: DashboardMetrics;
}

export function MetricGrid({ metrics }: MetricGridProps) {
  // Calculate dynamic allocation percentage for linear graphics safely
  const storageUsagePercent = Math.min(
    100, 
    metrics.wordsAllowed > 0 ? (metrics.wordsUsed / metrics.wordsAllowed) * 100 : 0
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      
      {/* Dynamic Word Token Counter Layer */}
      <Card className="bg-[#0D111A] border-slate-800/80 shadow-xl relative overflow-hidden group">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">
            AI Engine Allocation
          </CardTitle>
          <Cpu className="h-4 w-4 text-blue-500/80 transition-transform group-hover:rotate-12" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-2xl font-bold font-sans text-slate-100 tracking-tight">
              {metrics.wordsUsed.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {metrics.wordsAllowed.toLocaleString()} words</span>
            </div>
          </div>
          {/* Obsidian Style Progress Slider */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden p-[1px] border border-slate-800">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${storageUsagePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>CONSUMPTION</span>
            <span>{storageUsagePercent.toFixed(1)}% USED</span>
          </div>
        </CardContent>
      </Card>

      {/* Folders Tracking Node */}
      <Card className="bg-[#0D111A] border-slate-800/80 shadow-xl group">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Total Operational Folders
          </CardTitle>
          <Folder className="h-4 w-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-100 tracking-tight">{metrics.totalFolders}</div>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-tight">Active Directories</p>
        </CardContent>
      </Card>

      {/* Document Quantities Node */}
      <Card className="bg-[#0D111A] border-slate-800/80 shadow-xl sm:col-span-2 lg:col-span-1 group">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Processed Indexes
          </CardTitle>
          <FileText className="h-4 w-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-100 tracking-tight">{metrics.totalDocuments}</div>
          <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-tight">Parsed Documents</p>
        </CardContent>
      </Card>

    </div>
  );
}
