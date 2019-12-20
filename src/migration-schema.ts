import fs from 'fs'
import yaml from 'js-yaml'

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

const getMigrationSchema = async (migrationName: string): Promise<object> =>
  fs.readFileSync(getPath(migrationName));

export const parseMigrationSchema = async (migrationName: string): Promise<Schema> => {
  const config = await getMigrationSchema(migrationName);
  return yaml.safeLoad(String(config));
}
/*
  Returns list of available migrations could be run based on current one
  Returns all migrations once there is no current migration
*/
const getAvailableMigrationsToRun = (currentMigrationName: string | null): string[] => {
  const migrations = fs.readdirSync(migrationsDir).map(migration => parse(migration).name);
  if(currentMigrationName === null)
    return migrations;

  const currentMigrationIndex = migrations.findIndex(migration => migration == currentMigrationName)

  if (currentMigrationIndex < 0)
    throw new Error(`cannot find migration ${currentMigrationName} in migrations directory`)

  // we have to respond with next to current migration
  return migrations.slice(currentMigrationIndex + 1)
}

/*
  Returns list of available migrations should be run based on passed one
*/
export const getMigrationsToRun = (currentMigrationName: string | null, migrationToRun: string): string[] => {
  const availableMigrations = getAvailableMigrationsToRun(currentMigrationName);

  const migrationToRunIndex = availableMigrations.findIndex(migration => migration == migrationToRun)

  if (migrationToRunIndex < 0)
    throw new Error(`There is no upcoming migration. Current migration: ${currentMigrationName}`)

  return availableMigrations.slice(0, migrationToRunIndex + 1)
}

/*
  Returns list of available migrations could be run based on current one
  throws error once there is no current migration
*/
const getAvailableMigrationsToRollback = (currentMigrationName: string | null): string[] => {
  const migrations = fs.readdirSync(migrationsDir).map(migration => parse(migration).name);
  if (migrations.length == 0 || currentMigrationName === null )
    throw new Error('there are any migrations to rollback ')

  const currentMigrationIndex = migrations.findIndex(migration => migration == currentMigrationName)

  if (currentMigrationIndex < 0)
    throw new Error(`cannot find migration ${currentMigrationName} in migrations directory`)

  // we have to respond with previous to current migration
  return migrations.slice(0, currentMigrationIndex + 1)
}

/*
  Returns list of available migrations should be run based on passed one
*/
export const getMigrationsToRollback = (currentMigrationName: string | null, migrationToRun: string): string[] => {
  const availableMigrations = getAvailableMigrationsToRollback(currentMigrationName);

  const migrationToRollbackIndex = availableMigrations.findIndex(migration => migration == migrationToRun)

  if (migrationToRollbackIndex < 0)
    throw new Error(`There is no upcoming migration. Current migration: ${currentMigrationName}`)

  return availableMigrations.slice(migrationToRollbackIndex + 1).reverse()
}

export default {
  getPath,
  isExist,
  getMigrationsToRun,
  getMigrationsToRollback
}
