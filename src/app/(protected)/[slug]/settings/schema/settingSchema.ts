import { GroqModel } from '@/app/(protected)/onboarding/types';
import { z } from 'zod';

// 1. User Profile Settings Schema
export const userProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(50, { message: 'Full name must not exceed 50 characters.' }),
});

// 2. Workspace Provisioning Schema
export const workspaceSettingsSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Workspace name must be at least 3 characters.' })
    .max(32, { message: 'Workspace name must not exceed 32 characters.' }),

  selectedModel: z.nativeEnum(GroqModel, {
    error: 'Please select a valid supported AI model',
  }),
});

// Infer the TypeScript forms types directly from the Zod schemas
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
export type WorkspaceSettingsFormValues = z.infer<
  typeof workspaceSettingsSchema
>;
