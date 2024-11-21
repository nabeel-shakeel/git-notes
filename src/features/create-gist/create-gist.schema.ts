import { z } from 'zod';

export const createGistSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  files: z
    .array(
      z.object({
        filename: z.string().min(1, 'Filename is required'),
        content: z.string().min(1, 'Content is required'),
      })
    )
    .min(1, 'At least one file is required'),
});
