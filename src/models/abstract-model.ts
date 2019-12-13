import { getConnection } from '../mysql'

// originally used with mysql.QueryFunction interface.
export const query = (sql: string) => (
  new Promise((resolve, reject) =>
    getConnection().query(sql, (error, results) =>
      error ? reject(error) : resolve(results)
    )
  )
)
