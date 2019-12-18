import { ConnectionConfig } from 'mysql'
import fs from 'fs'

const usersDirectoryConfigPath = `${process.cwd()}/crispy.js`

type CrispyAPI = {
  url: string;
  apiKey: string;
}

export type Config = {
  tableName: string;
  migrationsDir: string;
  mysqlConnection?: ConnectionConfig | string;
  CrispyAPI?: CrispyAPI;
}

let usersDirectoryConfig = {}

if (fs.existsSync(usersDirectoryConfigPath)) {
  usersDirectoryConfig = require(usersDirectoryConfigPath)
}

const defaultConfig = {
  tableName: 'crispy_migrations',
  migrationsDir: 'migrations',

} as Config

export default { ...defaultConfig, ...usersDirectoryConfig }
