// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Meals {
    id: string
    name: string
    description: string
    mealed_at: string
    in_diet: boolean
    created_at: Date
  }

  export interface Tables {
    meals: Meals
  }
}
