import { parseMigrationSchema } from '../migration-schema'
import { query } from '../mysql'

// TODO: need to cover those points:
// * create array with avalible runners
// * use runner from config file
// * validate query syntax

export const run = async (migrationName: string): Promise<object> => {
  const { up: { query: sql } } = await parseMigrationSchema(migrationName);
  return query(sql);
}

export const rollback = async (migrationName: string): Promise<object> => {
  const { down: { query: sql } } = await parseMigrationSchema(migrationName);
  return query(sql);
}
