import fs from 'fs'
import { parse } from 'path'

import config from './config'

const { migrationsDir } = config

export type MigrationSchema = {
  table: string;
  operation: string;
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

/*
  Returns list of available migrations could be run
*/
const getAvailableMigrationsToRun = (currentMigrationName: string): string[] => {
  const migrations = fs.readdirSync(migrationsDir).map(migration => parse(migration).name);

  const currentMigrationIndex = migrations.findIndex(migration => migration == currentMigrationName)

  if (currentMigrationIndex < 0)
    throw new Error(`cannot find migration ${currentMigrationName} in migrations directory`)

  // we have to respond with next to current migration
  return migrations.slice(currentMigrationIndex + 1)
}

/*
  Returns list of available migrations should be run based on passed one
*/
export const getMigrationsToRun = (currentMigrationName: string, migrationToRun: string): string[] => {
  const availableMigrations = getAvailableMigrationsToRun(currentMigrationName);

  const migrationToRunIndex = availableMigrations.findIndex(migration => migration == migrationToRun)

  if (migrationToRunIndex < 0)
    throw new Error(`There is no upcoming migration. Current migration: ${currentMigrationName}`)

  return availableMigrations.slice(0, migrationToRunIndex + 1)
}

export default {
  getPath,
  isExist,
  getMigrationsToRun
}
