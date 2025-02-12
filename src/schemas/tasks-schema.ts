import { z } from 'zod'

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().nullable(),
  completed_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Task = z.infer<typeof taskSchema>
