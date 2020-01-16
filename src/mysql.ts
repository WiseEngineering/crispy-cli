import mysql, { Connection } from 'mysql'
import config from './config'

let mysqlConnection: Connection

export const createConnection = (): void => {
  if (!mysqlConnection && config.mysqlConnection)
    mysqlConnection = mysql.createConnection(config.mysqlConnection)
}

export const getConnection = (): Connection => mysqlConnection

export const closeConnection = (): void => mysqlConnection.end()

export const query = async (sql: string): Promise<Array<object>> => (
  new Promise((resolve, reject) =>
    getConnection().query(sql, (error, results) =>
      error ? reject(error) : resolve(results)
    )
  )
)

export const esc = (value: string | number): string => getConnection().escape(value)

export const formatDate = (date: Date): string =>
  esc(date.toISOString().slice(0, 19).replace('T', ' '))
