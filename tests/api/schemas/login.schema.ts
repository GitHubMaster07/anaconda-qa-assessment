import { z } from 'zod';

// Success response schema
export const loginSuccessSchema = z.object({
  token: z.string().min(1, 'Token must not be empty')
});

// Error response schema
export const errorResponseSchema = z.object({
  error: z.string().min(1, 'Error message must not be empty')
});

// Type inference from schema
export type LoginSuccessResponse = z.infer<typeof loginSuccessSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;