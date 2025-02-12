import { knex } from '@/database'
import { Task, taskSchema } from '@/schemas/tasks-schema'

export class TasksRepository {
  static async create(
    task: Omit<Task, 'id' | 'completed_at' | 'created_at' | 'updated_at'>,
  ) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      ...task,
    }

    await knex('tasks').insert(taskSchema.parse(newTask))
  }
}
