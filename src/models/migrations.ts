
import { query, esc, formatDate } from './abstract-model'
import config from '../config'

type Migration = {
  id: Number,
  name: String,
  started_at: Date,
  finished_at: Date,
}
const tableName = config.migrationsDir;

export const initTable = () => query(`
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255) NOT NULL UNIQUE,
    started_at DATETIME NOT NULL,
    finished_at DATETIME NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB;
`)


export const startMigration = (migrationName: string) => query(`
  INSERT INTO ${tableName} (name, started_at)
  VALUES (${esc(migrationName)}, ${formatDate(new Date())})
`)

