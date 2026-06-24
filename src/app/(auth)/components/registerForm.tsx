'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { registerSchema, RegisterInput } from '../schemas/registerSchema';
import { useRegister } from '../hooks/useRegisterMutation';

// Presentational field primitives
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GoogleButton } from './GoogleButton';

export default function RegisterForm() {
  const { mutate, isPending } = useRegister();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterInput) => {
    mutate(data);
  };

  return (
    <div className="relative p-8 rounded-2xl bg-[#0c0c0e]/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl shadow-black/50 space-y-6 overflow-hidden ring-1 ring-white/[0.02]">
      {/* Top Edge Neon Laser Line Alignment */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Micro Tech Corner Ornaments */}
      <div className="absolute top-1 left-1 w-1 h-1 border-t border-l border-zinc-700/50 pointer-events-none" />
      <div className="absolute top-1 right-1 w-1 h-1 border-t border-r border-zinc-700/50 pointer-events-none" />

      {/* Form Header */}
      <div className="space-y-1.5 relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          Create an account
        </h2>
        <p className="text-sm text-zinc-400">
          Provision your identity nodes to deploy the generative engine.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative z-10"
      >
        {/* Grid Row: For Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                >
                  Operator Name
                </FieldLabel>
                <Input
                  placeholder="John Doe"
                  className="rounded-xl py-5 bg-zinc-950/40 border-zinc-800/50 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 transition-all"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-500"
                >
                  Neural Identity / Email
                </FieldLabel>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="rounded-xl py-5 bg-zinc-950/40 border-zinc-800/50 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 transition-all"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        {/* Full-Width Password Field */}
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="text-[10px] font-bold uppercase tracking-widest text-zinc-500"
              >
                Access Key / Password
              </FieldLabel>
              <Input
                type="password"
                placeholder="••••••••"
                className="rounded-xl py-5 bg-zinc-950/40 border-zinc-800/50 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 transition-all"
                id={field.name}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-5 font-semibold text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.99] mt-2 border border-purple-400/20"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-purple-200" />
              Initializing Node...
            </>
          ) : (
            'Initialize Base Infrastructure'
          )}
        </Button>
      </form>

      {/* Visual Divider */}
      <div className="relative flex items-center justify-center my-5 relative z-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-900" />
        </div>
        <span className="relative bg-[#0c0c0e] px-3 text-[10px] uppercase tracking-widest text-zinc-500 select-none">
          Or pipeline through
        </span>
      </div>

      {/* Google Authentication Option */}
      <div className="relative z-10">
        <GoogleButton />
      </div>

      {/* Footer Navigation */}
      <div className="text-center pt-2 relative z-10">
        <p className="text-sm text-zinc-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-purple-400 hover:text-purple-300 transition-colors underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
