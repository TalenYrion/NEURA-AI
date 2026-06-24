// inside schemas/aiSchema.ts
import * as z from 'zod';

export const generateFormSchema = z.object({
  title: z.string().min(3),
  prompt: z.string().min(10),
  toolType: z.string().min(1),
  creativity: z.array(z.number()), // 💡 Must match defaultValues array syntax perfectly!
});

export type GenerateFormValues = z.infer<typeof generateFormSchema>;
