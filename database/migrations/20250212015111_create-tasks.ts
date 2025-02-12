import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.text('description')
    table.timestamp('completed_at')
    table.timestamp('created_at').defaultTo(knex.fn.now).notNullable()
    table.timestamp('updated_at').defaultTo(knex.fn.now).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks')
}
