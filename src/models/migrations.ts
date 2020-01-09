import { query, esc, formatDate } from './../mysql'
import config from '../config'

type Migration = {
  id: number;
  name: string;
  started_at: Date;
  finished_at: Date;
}

const tableName = config.migrationsDir

// TODO: convert all mysql RowData into Migration type
export const initTable = async (): Promise<object> => query(`
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL UNIQUE,
    started_at DATETIME NOT NULL,
    finished_at DATETIME NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;
`)

// TODO: map response with `Migration` type. Use that type instead of object
export const startMigration = async (migrationName: string): Promise<object> => query(`
  INSERT INTO ${tableName} (name, started_at)
    VALUES (${esc(migrationName)}, ${formatDate(new Date())})
`)

export const finishMigration = async (migrationName: string): Promise<object> => query(`
  UPDATE ${tableName}
    SET finished_at=${formatDate(new Date())}
    WHERE name=${esc(migrationName)}
`)

export const deleteMigration = async (migrationName: string): Promise<object> => query(`
  DELETE FROM ${tableName}
  WHERE name=${esc(migrationName)}
`)

export const getLastMigration = async (): Promise<Migration | null> => query(`
  SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1;`)
  .then(res => res[0] ? res[0] as Migration : null)
