//Run next migration or specified one
import { initTable, startMigration, finishMigration, deleteMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'
import migrationSchema from '../../migration-schema'

export default async (migrationName: string): Promise<void> => {
  try {
    createConnection()

    // TODO: need to cover those points:
    // * is migration syntax right
    // * use migrations transaction to be sure we are in sync with running query
    // * check with latest migration in database
    // * how many migrations we have to run between db migration and one we've passed
    if (migrationSchema.isExist(migrationName)) {
      await initTable();

      await startMigration(migrationName);

      console.log(`running migrate ${migrationName} query`)

      await finishMigration(migrationName)

      closeConnection()
    } else {
      console.error(`migration ${migrationSchema.getPath(migrationName)} is not exist`)
    }
  } catch (e) {
    // TODO: add logging module
    console.error(e)
    await deleteMigration(migrationName)
    closeConnection()
  }

}
