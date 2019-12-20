import yaml from 'js-yaml'
import fs from 'fs'
import { getPath, Schema } from '../migration-schema'
import { query } from '../models/abstract-model'

// TODO: need to cover those points:
// * create array with avalible runners
// * use runner from config file
// * validate query syntax

const getConfig = async (migrationName: string): Promise<object> => {
  return fs.readFileSync(getPath(migrationName));
}

const parseConfig = async (migrationName: string): Promise<Schema> => {
  const config = await getConfig(migrationName);
  return yaml.safeLoad(String(config));
}

export const run = async (migrationName: string): Promise<object> => {
  const { up: { query: sql } } = await parseConfig(migrationName);
  return query(sql);
}

export const rollback = async (migrationName: string): Promise<object> => {
  const { down: { query: sql } } = await parseConfig(migrationName);
  return query(sql);
}
