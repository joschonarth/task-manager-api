import { z } from 'zod'

export const updateTaskSchema = z
  .object({
    title: z.string().min(2).optional(),
    description: z.string().nullable().optional(),
  })
  .refine((data) => data.title || data.description, {
    path: ['title', 'description'],
  })
