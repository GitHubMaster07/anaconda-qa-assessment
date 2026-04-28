import { z } from 'zod';

export const profileSuccessSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  name: z.string().min(1)
});

export const errorResponseSchema = z.object({
  error: z.string().min(1)
});