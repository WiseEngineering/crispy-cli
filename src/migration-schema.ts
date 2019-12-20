import fs from 'fs'
import config from './config'

const { migrationsDir } = config

export type MigrationSchema = {
  table: string;
  operation: string;
  runner: string;
  query: string;
}

export type Schema = {
  version: number;
  up: MigrationSchema;
  down: MigrationSchema;
}
export const getPath = (migrationName: string): string =>
  `${migrationsDir}/${migrationName}.yml`;

export const isExist = (migrationName: string): boolean =>
  fs.existsSync(getPath(migrationName))

export default {
  getPath,
  isExist
}
