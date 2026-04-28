import { z } from 'zod';

export const forgotPasswordSuccessSchema = z.object({
  message: z.string().min(1)
});

export const errorResponseSchema = z.object({
  error: z.string().min(1)
});