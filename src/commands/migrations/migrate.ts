//Run next migration or specified one
import { initTable, startMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'

export default (migrationName: string): void => {
  createConnection()

  initTable()
    .then(() => startMigration(migrationName))
    .then(() => console.log(`migrate to ${migrationName}`))
    .then(closeConnection)
    .catch(err => {
      console.log(err)
      closeConnection()
    })
}
