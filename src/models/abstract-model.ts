import { getConnection } from '../mysql'

// originally used with mysql.QueryFunction interface.
export const query = (sql: string) => (
  new Promise((resolve, reject) =>
    getConnection().query(sql, (error, results) =>
      error ? reject(error) : resolve(results)
    )
  )
)

export const esc = (value: string | number) => getConnection().escape(value)

export const formatDate = (date: Date) =>
  esc(date.toISOString().slice(0, 19).replace('T', ' '));
