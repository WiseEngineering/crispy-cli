//Run next migration or specified one
import { initTable, startMigration, finishMigration, deleteMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'

export default (migrationName: string): void => {
  createConnection()

  // TODO: need to cover those points(mostly the same for `migrate`):
  // * is migration exist
  // * is migration syntax right
  // * use migrations transaction to be sure we are in sync with running query
  // * how many migrations we have to run between db migration and one we've passed

  initTable()
    .then(() => console.log(`running rollback ${migrationName} query`))
    .then(() => deleteMigration(migrationName))
    .then(closeConnection)
    .catch(err => {
      console.log(err)
      closeConnection()
    })
}
