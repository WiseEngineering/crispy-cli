//Run next migration or specified one
import { initTable, startMigration, finishMigration, deleteMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'

export default (migrationName: string): void => {
  createConnection()

  initTable()
    .then(() => console.log(`rollback ${migrationName}`))
    .then(() => deleteMigration(migrationName))
    .then(closeConnection)
    .catch(err => {
      console.log(err)
      closeConnection()
    })
}
