'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import {
  createWorkspaceSchema,
  OnboardingInput,
} from '../schemas/workSpaceSchema';
import { useWorkspace } from '../hooks/useWorkspace';

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GroqModel } from '../types';
import { ModelSelector } from './ModelSelector';

export default function OnboardingForm() {
  const { mutate: createWorkspace, isPending } = useWorkspace();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      selectedModel: GroqModel.LLAMA_33_70B,
    },
  });

  const onSubmit = (data: OnboardingInput) => {
    createWorkspace(data);
  };

  return (
    <Card className="w-full bg-[#0D111A] border-slate-800/80 shadow-2xl backdrop-blur-md relative overflow-hidden max-w-md mx-auto">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <CardHeader className="space-y-1.5 pb-6">
        <CardTitle className="text-2xl font-semibold text-slate-100 tracking-tight">
          Create your workspace
        </CardTitle>
        <CardDescription className="text-sm text-slate-400">
          Set up your digital environment and deploy your dedicated model
          engine.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Workspace Name via Primitive <Field /> */}
          <Field data-invalid={!!errors.name}>
            <FieldLabel
              htmlFor="name"
              className="text-xs font-medium uppercase tracking-wider text-slate-400"
            >
              Workspace Name
            </FieldLabel>
            <Input
              {...register('name')}
              id="name"
              placeholder="e.g., Nexus Labs, Marketing Core"
              disabled={isPending}
              aria-invalid={!!errors.name}
              className="bg-[#131924] border-slate-800 text-slate-200 placeholder:text-slate-600 h-11 focus-visible:ring-blue-500/40 focus-visible:border-blue-500 transition-all rounded-xl"
            />
            <FieldError className="text-xs text-rose-500 font-medium tracking-wide" />
          </Field>

          {/* AI Model Selection via Controller + Primitive <Field /> */}
          <Controller
            control={control}
            name="selectedModel"
            render={({ field }) => (
              <Field data-invalid={!!errors.selectedModel}>
                <FieldLabel className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Select Default AI Engine
                </FieldLabel>
                <ModelSelector
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                />
                <FieldError className="text-xs text-rose-500 font-medium tracking-wide" />
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium h-11 rounded-xl shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 mt-4"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Initializing Core...</span>
              </>
            ) : (
              'Launch Workspace'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
