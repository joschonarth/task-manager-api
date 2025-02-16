import { knex } from '@/database'
import { Task, taskSchema } from '@/schemas/tasks-schema'

export class TasksRepository {
  static async create(
    task: Omit<Task, 'id' | 'completed_at' | 'created_at' | 'updated_at'>,
  ) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await knex('tasks').insert(taskSchema.parse(newTask))

    return newTask
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

  static async update(
    id: string,
    updatedFields: { title?: string; description?: string },
  ): Promise<Task> {
    const updateData: {
      title?: string
      description?: string
      updated_at: string
    } = {
      updated_at: new Date().toISOString(),
      ...updatedFields,
    }

    await knex('tasks').where({ id }).update(updateData)

    const updatedTask = await knex('tasks').where({ id }).first()

    return updatedTask
  }

  static async delete(id: string): Promise<boolean> {
    const taskExists = await knex('tasks').where({ id }).first()

    if (!taskExists) {
      return false
    }

    await knex('tasks').where({ id }).delete()
    return true
  }

  static async complete(id: string): Promise<Task> {
    const data: {
      completed_at: string
      updated_at: string
    } = {
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await knex('tasks').where({ id }).update(data)

    const completedTask = await knex('tasks').where({ id }).first()

    return completedTask
  }

  static async createMany(
    tasks: Omit<Task, 'id' | 'completed_at' | 'created_at' | 'updated_at'>[],
  ): Promise<void> {
    const newTasks = tasks.map((task) => ({
      id: crypto.randomUUID(),
      completed_at: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...task,
    }))

    await knex('tasks').insert(newTasks.map((task) => taskSchema.parse(task)))
  }
}
