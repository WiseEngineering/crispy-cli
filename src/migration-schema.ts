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
Returns list of migrations should be run based on current migration version
*/
export const getMigrationsToRun = (currentMigrationName: string): string[] => {
  const migrations = fs.readdirSync(migrationsDir).map(migration => parse(migration).name);

  const currentMigrationIndex = migrations.findIndex(migration => migration == currentMigrationName)
  if (!currentMigrationIndex)
    throw new Error(`cannot find migration ${currentMigrationName} in migrations directory`)
  // Need to increase index into 2 steps: 1 - currentMigrationIndex index from 0,
  // the second one - we have to respond with next to current migration
  return migrations.slice(currentMigrationIndex + 2)
}

export default {
  getPath,
  isExist,
  getMigrationsToRun
}
