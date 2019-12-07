// TODO: import from mysql library
type MysqlConnection = {}

type CrispyServer = {
  url: string
  apiKey: string
}

export type Config = {
  tableName: string,
  migrationsDir: string,
  mysqlConnection: MysqlConnection | null,
  crispyServer: CrispyServer | null
}

//TODO: get config from users directory
const usersDirectory = {}

const defaultConfig = {
  tableName: 'crispy_migrations',
  migrationsDir: 'migrations',
}

export default { ...defaultConfig, ...usersDirectory }
