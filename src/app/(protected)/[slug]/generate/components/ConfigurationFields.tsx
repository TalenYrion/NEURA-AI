'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  Field, 
  FieldLabel, 
  FieldError 
} from '@/components/ui/field'; 
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GenerateFormValues } from '../schemas/aiSchema';

interface ConfigurationFieldsProps {
  form: UseFormReturn<GenerateFormValues>;
}

export function ConfigurationFields({ form }: ConfigurationFieldsProps) {
  const { register, formState: { errors } } = form;

  return (
    <>
      {/* 1. Document Title Field */}
      <Field data-invalid={!!errors.title}>
        <FieldLabel className="text-xs uppercase tracking-wider font-mono text-slate-400">
          Document File Title
        </FieldLabel>
        <Input 
          placeholder="e.g., Q3 Marketing Framework Overview" 
          className="bg-[#0D111A] border-slate-800 focus:border-blue-500/50 rounded-xl text-sm text-slate-200" 
          {...register('title')} 
        />
        {errors.title && <FieldError className="text-xs text-rose-400">{errors.title.message}</FieldError>}
      </Field>

      {/* 2. Prompt Directive Instructions (Textarea) Field */}
      <Field data-invalid={!!errors.prompt}>
        <FieldLabel className="text-xs uppercase tracking-wider font-mono text-slate-400">
          Prompt Directive Instructions
        </FieldLabel>
        <Textarea 
          placeholder="Supply structural instructions or focus constraints for your asset generation prompt..." 
          className="bg-[#0D111A] border-slate-800 focus:border-blue-500/50 rounded-xl min-h-[220px] text-sm text-slate-300 resize-none leading-relaxed" 
          {...register('prompt')}
        />
        {errors.prompt && <FieldError className="text-xs text-rose-400">{errors.prompt.message}</FieldError>}
      </Field>
    </>
  );
}
