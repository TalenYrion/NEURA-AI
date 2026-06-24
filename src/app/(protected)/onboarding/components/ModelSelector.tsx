'use client';

import React from 'react';
import { GroqModel, SUPPORTED_MODELS } from '../types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ModelSelectorProps {
  value: GroqModel;
  onValueChange: (value: GroqModel) => void;
  disabled?: boolean;
}

export function ModelSelector({
  value,
  onValueChange,
  disabled,
}: ModelSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(val) => onValueChange(val as GroqModel)}
      disabled={disabled}
      className="grid grid-cols-1 gap-3"
    >
      {SUPPORTED_MODELS.map((model) => {
        const isSelected = value === model.id;

        return (
          <div key={model.id}>
            <RadioGroupItem
              value={model.id}
              id={model.id}
              className="sr-only"
            />
            <Label
              htmlFor={model.id}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between group relative overflow-hidden cursor-pointer ${
                isSelected
                  ? 'bg-[#162031] border-blue-500/80 shadow-md shadow-blue-950/20'
                  : 'bg-[#131924] border-slate-800/80 hover:bg-[#161f2e] hover:border-slate-700'
              } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="space-y-1">
                <div className="font-medium text-slate-200 group-hover:text-slate-100 flex items-center space-x-2">
                  <span>{model.name}</span>
                  {model.tier === 'premium' && (
                    <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 uppercase border border-blue-500/20">
                      Pro
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-mono tracking-tight">
                  {model.id}
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-slate-700'
                }`}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
