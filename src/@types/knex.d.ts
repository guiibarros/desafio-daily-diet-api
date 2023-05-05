// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Meal {
    id: string
    session_id: string
    name: string
    description: string
    mealed_at: string
    is_diet: boolean
    created_at: Date
  }

  export interface Tables {
    meals: Meal
  }
}
