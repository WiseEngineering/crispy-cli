import mysql, { Connection } from 'mysql'
import config from './config'


let mysqlConnection: Connection;

export const createConnection = (): void => {
  if (!mysqlConnection && config.mysqlConnection)
    mysqlConnection = mysql.createConnection(config.mysqlConnection)
}

export const getConnection = (): Connection =>
  mysqlConnection

export const closeConnection = (): void =>
  mysqlConnection.end()
