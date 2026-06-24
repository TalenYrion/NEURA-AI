'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Cpu, Save, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation'; // 💡 Added to read slug directly from layout mount state
import {
  userProfileSchema,
  workspaceSettingsSchema,
  UserProfileFormValues,
  WorkspaceSettingsFormValues,
} from './schema/settingSchema';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateUser } from './hooks/useUpdateUser';
import { useUpdateWorkspace } from './hooks/useUpdateWorkspace';
import { GroqModel } from '../../onboarding/types';

interface SettingsFormProps {
  currentSlug: string;
  initialUser: { fullName: string };
  initialWorkspace: { name: string; slug: string; selectedModel: string };
}

export default function SettingsFormView({
  currentSlug: fallbackSlug,
  initialUser,
  initialWorkspace,
}: SettingsFormProps) {
  const params = useParams();

  // 💡 THE HARD FIX: If currentSlug comes down as 'undefined' string from async server components,
  // we fallback directly to the client runtime window routing params.
  const routeSlug = typeof params?.slug === 'string' ? params.slug : '';
  const activeSlug =
    routeSlug && routeSlug !== 'undefined' ? routeSlug : fallbackSlug;

  const updateUserMutation = useUpdateUser();
  const updateWorkspaceMutation = useUpdateWorkspace({
    currentSlug: activeSlug,
  });

  // 1. Hook Form - User Profile Instance
  const userForm = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: initialUser?.fullName || '',
    },
  });

  // 2. Hook Form - Workspace Instance
  const workspaceForm = useForm<WorkspaceSettingsFormValues>({
    resolver: zodResolver(workspaceSettingsSchema),
    defaultValues: {
      name: initialWorkspace?.name || '',
      selectedModel:
        (initialWorkspace?.selectedModel as any) || GroqModel.LLAMA_3_3_70B,
    },
  });

  const onUserSubmit = (values: UserProfileFormValues) => {
    updateUserMutation.mutate(values);
  };

  const onWorkspaceSubmit = (values: WorkspaceSettingsFormValues) => {
    // Failsafe guard check before dispatching network request payloads
    if (!activeSlug || activeSlug === 'undefined') {
      console.error(
        ' Aborting API Request: activeSlug is currently undefined.',
      );
      return;
    }
    updateWorkspaceMutation.mutate(values);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-4 md:p-8 text-slate-200">
      {/* Structural Header Title */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-purple-300 to-slate-400">
          Control Matrix Settings
        </h1>
        <p className="text-xs font-mono text-purple-400/60 uppercase tracking-widest">
          Node Engine / Identity Parameter Overrides
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Hand Navigation / Utility Helper panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-xl border border-purple-950/30 bg-[#0B0A14]/60 backdrop-blur-md space-y-3">
            <h3 className="text-xs font-mono tracking-wider font-semibold uppercase text-purple-400">
              System Parameters
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Updates to workspace configurations immediately recalculate
              routing definitions across the gateway.
            </p>
          </div>
        </div>

        {/* Form Entry Field Matrix Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* SECTION ONE: User Profile Sync */}
          <form onSubmit={userForm.handleSubmit(onUserSubmit)}>
            <Card className="bg-[#0D0B18]/50 border-purple-950/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              <CardHeader className="space-y-1">
                <CardTitle className="text-sm font-mono font-semibold tracking-wider text-slate-100 uppercase flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-400" /> User Profile
                  Configuration
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Update your global core user identity signature properties.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Full Operator Name
                  </label>
                  <Input
                    {...userForm.register('fullName')}
                    placeholder="e.g. Alex Mercer"
                    className="bg-[#07050E]/80 border-purple-950/60 focus-visible:ring-purple-500/50 text-slate-200"
                  />
                  {userForm.formState.errors.fullName && (
                    <p className="text-[11px] font-mono text-rose-400">
                      {userForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="border-t border-purple-950/20 bg-[#0A0813]/40 px-6 py-3 flex justify-end">
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-700/40 text-xs font-mono h-9 rounded-xl transition-all"
                >
                  {updateUserMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
                  ) : (
                    <Save className="h-3.5 w-3.5 mr-2" />
                  )}
                  Save Profile
                </Button>
              </CardFooter>
            </Card>
          </form>

          {/* SECTION TWO: Workspace & Model Engine Allocation */}
          <form onSubmit={workspaceForm.handleSubmit(onWorkspaceSubmit)}>
            <Card className="bg-[#0D0B18]/50 border-purple-950/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              <CardHeader className="space-y-1">
                <CardTitle className="text-sm font-mono font-semibold tracking-wider text-slate-100 uppercase flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-purple-400" /> Engine
                  Provisioning Node
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  Manage pipeline cluster naming constraints and active
                  inference hardware engines. Slug routing parameters generate
                  automatically.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Workspace Cluster Name
                  </label>
                  <Input
                    {...workspaceForm.register('name')}
                    placeholder="e.g. Nexus Core"
                    className="bg-[#07050E]/80 border-purple-950/60 focus-visible:ring-purple-500/50 text-slate-200"
                  />
                  {workspaceForm.formState.errors.name && (
                    <p className="text-[11px] font-mono text-rose-400">
                      {workspaceForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Hardware Inference Model Selector */}
                <div className="space-y-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Dedicated Generation LLM Engine
                  </label>
                  <React.Fragment>
                    <Select
                      onValueChange={(value) =>
                        workspaceForm.setValue('selectedModel', value as any)
                      }
                      defaultValue={workspaceForm.getValues('selectedModel')}
                    >
                      <SelectTrigger className="bg-[#07050E]/80 border-purple-950/60 focus:ring-purple-500/50 text-slate-200 text-xs font-mono h-10">
                        <SelectValue placeholder="Select Neural Inference Engine Cluster" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D0B18] border-purple-950/80 text-slate-300 font-mono text-xs">
                        <SelectItem
                          value={GroqModel.LLAMA_3_3_70B}
                          // 💡 THE FIX: Added !text-white to force white text over Radix UI's black text default
                          className="focus:bg-purple-600 focus:!text-white data-[highlighted]:bg-purple-600 data-[highlighted]:!text-white cursor-pointer transition-colors"
                        >
                          Llama 3.3 70B SpecDec (Ultra Fast 1,600+ t/s)
                        </SelectItem>
                        <SelectItem
                          value={GroqModel.LLAMA_3_1_8B}
                          className="focus:bg-purple-600 focus:!text-white data-[highlighted]:bg-purple-600 data-[highlighted]:!text-white cursor-pointer transition-colors"
                        >
                          Llama 3.1 8B Instant (Edge Responsive Engine)
                        </SelectItem>
                        <SelectItem
                          value={GroqModel.GPT_OSS_120B}
                          className="focus:bg-purple-600 focus:!text-white data-[highlighted]:bg-purple-600 data-[highlighted]:!text-white cursor-pointer transition-colors"
                        >
                          GPT OSS 120B Reasoning (High Logic Deep Compute)
                        </SelectItem>
                      </SelectContent>{' '}
                    </Select>
                  </React.Fragment>
                  {workspaceForm.formState.errors.selectedModel && (
                    <p className="text-[11px] font-mono text-rose-400">
                      {workspaceForm.formState.errors.selectedModel.message}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="border-t border-purple-950/20 bg-[#0A0813]/40 px-6 py-3 flex justify-end">
                <Button
                  type="submit"
                  disabled={updateWorkspaceMutation.isPending}
                  className="bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-700/40 text-xs font-mono h-9 rounded-xl transition-all"
                >
                  {updateWorkspaceMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" />
                  ) : (
                    <Save className="h-3.5 w-3.5 mr-2" />
                  )}
                  Commit Workspace Sync
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
