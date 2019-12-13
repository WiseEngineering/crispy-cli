//Run next migration or specified one
import { initTable, startMigration, finishMigration, deleteMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'

export default (migrationName: string): void => {
  createConnection()

  initTable()
    .then(() => startMigration(migrationName))
    .then(() => console.log(`running ${migrationName} migration query`))
    .then(() => finishMigration(migrationName))
    .then(closeConnection)
    .catch(err => {
      console.log(err)
      return deleteMigration(migrationName)
        .then(closeConnection)
    })
}
