import { knex } from '@/database'
import { Task, taskSchema } from '@/schemas/tasks-schema'

export class TasksRepository {
  static async create(
    task: Omit<Task, 'id' | 'completed_at' | 'created_at' | 'updated_at'>,
  ) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...task,
    }

    await knex('tasks').insert(taskSchema.parse(newTask))
  }

  static async findAll(filters?: {
    title?: string
    description?: string
  }): Promise<Task[]> {
    let query = knex('tasks').select('*')

    if (filters) {
      if (filters.title) {
        query = query.where('title', 'like', `%${filters.title}%`)
      }
      if (filters.description) {
        query = query.where('description', 'like', `%${filters.description}%`)
      }
    }
    return await query
  }
}
