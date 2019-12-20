import yaml from 'js-yaml'
import fs from 'fs'
import { getPath, Schema } from '../migration-schema'

const getConfig = async (migrationName: string): Promise<object> => {
  return fs.readFileSync(getPath(migrationName));
}

const parseConfig = async (migrationName: string): Promise<Schema> => {
  const config = await getConfig(migrationName);
  return yaml.safeLoad(String(config));
}

export const run = async (migrationName: string): Promise<void> => {
  const { up } = await parseConfig(migrationName);
  const { table, operation, runner, query } = up;
  
  // run query 

}


export const rollback = async (migrationName: string): Promise<void> => {
  const { down } = await parseConfig(migrationName);
  const { table, operation, runner, query } = down;
  
  // run query 

}