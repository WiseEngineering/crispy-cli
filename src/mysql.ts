import mysql, { Connection } from 'mysql'
import config from './config'


let mysqlConnection: Connection;

export const createConnection = () => {
  if (!mysqlConnection && config.mysqlConnection)
    mysqlConnection = mysql.createConnection(config.mysqlConnection)
};

export const getConnection = () => {
  return mysqlConnection
}
export const closeConnection = () => {
  mysqlConnection.end()
}
