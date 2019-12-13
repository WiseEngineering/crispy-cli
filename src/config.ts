import { ConnectionConfig } from 'mysql'

type CrispyAPI = {
  url: string,
  apiKey: string
}

export type Config = {
  tableName: string,
  migrationsDir: string,
  // Now, database connection is required in config. Need to think about user cases and consider about allowing it nullable as well
  // mysqlConnection: ConnectionConfig | string | null,
  mysqlConnection: ConnectionConfig | string,
  crispyServer: CrispyAPI | null
}

//TODO: get config from users directory
// TODO: use env variables for mysql password
const usersDirectory = {
  mysqlConnection: {
    host: 'localhost',
    user: 'root',
    password: '123root123',
  }
}

const defaultConfig = <Config>{
  tableName: 'crispy_migrations',
  migrationsDir: 'migrations',

}

export default { ...defaultConfig, ...usersDirectory }
