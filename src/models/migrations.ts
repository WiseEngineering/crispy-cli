
import { query } from './abstract-model'

type Migration = {
  id: Number,
  name: String,
  created_at: Date,
  updated_at: Date
}

export const initTable = () => {
  return query('SELECT 1;')

}

