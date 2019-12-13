
import { query, esc, formatDate } from './abstract-model'
import config from '../config'

type Migration = {
  id: number;
  name: string;
  started_at: Date;
  finished_at: Date;
};
const tableName = config.migrationsDir;

export const initTable = (): Promise<object> => query(`
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL UNIQUE,
    started_at DATETIME NOT NULL,
    finished_at DATETIME NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;
`);

// TODO: map response with `Migration` type. Use that type instead of object
export const startMigration = (migrationName: string): Promise<object> => query(`
  INSERT INTO ${tableName} (name, started_at)
    VALUES (${esc(migrationName)}, ${formatDate(new Date())})
`);

export const finishMigration = (migrationName: string): Promise<object> => query(`
  UPDATE ${tableName}
    SET finished_at=${formatDate(new Date())}
    WHERE name=${esc(migrationName)}
`);

export const deleteMigration = (migrationName: string): Promise<object> => query(`
  DELETE FROM ${tableName}
  WHERE name=${esc(migrationName)}
`);