import { z } from 'zod';
import { GroqModel } from '../types';

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Workspace name must be at least 2 characters long' })
    .max(50, { message: 'Workspace name cannot exceed 50 characters' })
    .trim(),

  selectedModel: z.nativeEnum(GroqModel, {
    error: 'Please select a valid supported AI model',
  }),
});

// Infer the type straight from the schema to keep it in sync automatically
export type OnboardingInput = z.infer<typeof createWorkspaceSchema>;
