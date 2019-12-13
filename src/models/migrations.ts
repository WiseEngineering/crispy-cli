
import { query } from './abstract-model'
import config from '../config'

type Migration = {
  id: Number,
  name: String,
  started_at: Date,
  finished_at: Date,
}

export const initTable = () => {
  return query(`
      CREATE TABLE IF NOT EXISTS ${config.migrationsDir} (
        id INT NOT NULL AUTO_INCREMENT,
        name CHAR(255) NOT NULL,
        started_at DATETIME NOT NULL,
        finished_at DATETIME NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB;
  `)
}

