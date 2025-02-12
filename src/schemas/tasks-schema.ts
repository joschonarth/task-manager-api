import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
  completed_at: z.coerce.date().nullable(),
  created_at: z.preprocess(
    (arg) => new Date(arg as number).toISOString(),
    z.string(),
  ),
  updated_at: z.preprocess(
    (arg) => new Date(arg as number).toISOString(),
    z.string(),
  ),
})

export type Task = z.infer<typeof taskSchema>
