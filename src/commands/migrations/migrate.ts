//Run next migration or specified one
import { initTable, startMigration, finishMigration, deleteMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'
import migrationSchema from '../../migration-schema'

export default (migrationName: string): void => {
  createConnection()

  // TODO: need to cover those points:
  // * is migration syntax right
  // * use migrations transaction to be sure we are in sync with running query
  // * how many migrations we have to run between db migration and one we've passed
  if (migrationSchema.isExist(migrationName)) {
    initTable()
      .then(() => startMigration(migrationName))
      .then(() => console.log(`running migrate ${migrationName} query`))
      .then(() => finishMigration(migrationName))
      .then(closeConnection)
      .catch(err => {
        console.log(err)
        deleteMigration(migrationName)
          .then(closeConnection)
      })
  } else {
    console.error(`migration ${migrationSchema.getPath(migrationName)} is not exist`)
  }

}
