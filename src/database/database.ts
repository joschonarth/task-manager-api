import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  client: 'sqlite',
  connection: {
    filename: './src/database/app.db',
  },
  useNullAsDefault: true,
})
