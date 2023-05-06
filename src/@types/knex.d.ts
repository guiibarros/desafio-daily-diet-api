// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Meal {
    id: string
    user_id: string
    name: string
    description: string
    mealed_at: string
    is_diet: boolean
    created_at: Date
  }

  export interface User {
    id: string
    name: string
    email: string
    password: string
    created_at: Date
  }

  export interface Tables {
    meals: Meal
    users: User
  }
}
