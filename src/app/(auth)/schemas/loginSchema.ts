import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  /* .max(100, { message: 'Password cannot exceed 100 characters' })
     Optional: Add regex if your NestJS backend requires specific characters
    .regex(/[A-Z]/, {
     message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    */
});

export type LoginInput = z.infer<typeof loginSchema>;
