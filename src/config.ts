import { ConnectionConfig } from 'mysql'

type CrispyAPI = {
  url: string,
  apiKey: string
}

export type Config = {
  tableName: string,
  migrationsDir: string,
  mysqlConnection?: ConnectionConfig | string,
  crispyServer?: CrispyAPI
}

//TODO: get config from users directory
//TODO: use env variables for mysql password
const usersDirectory = {
  mysqlConnection: {
    host: 'localhost',
    user: 'root',
    password: '123root123',
    database: 'crispy'
  }
}

const defaultConfig = <Config>{
  tableName: 'crispy_migrations',
  migrationsDir: 'migrations',

}

export default { ...defaultConfig, ...usersDirectory }
