import { getConnection } from '../mysql'

// originally used with mysql.QueryFunction interface.
export const query = async (sql: string): Promise<object> => (
  new Promise((resolve, reject) =>
    getConnection().query(sql, (error, results) =>
      error ? reject(error) : resolve(results)
    )
  )
)

export const esc = (value: string | number): string => getConnection().escape(value)

export const formatDate = (date: Date): string =>
  esc(date.toISOString().slice(0, 19).replace('T', ' '));
