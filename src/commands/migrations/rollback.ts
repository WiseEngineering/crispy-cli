//Run next migration or specified one
import { deleteMigration } from './../../models/migrations'
import migrationSchema from './../../migration-schema'
import { createConnection, closeConnection } from '../../mysql'

export default async (migrationName: string): Promise<void> => {
  createConnection()

  // TODO: need to cover those points(mostly the same for `migrate`):
  // * is migration exist
  // * is migration syntax right
  // * use migrations transaction to be sure we are in sync with running query
  // * how many migrations we have to run between db migration and one we've passed

  try {
    if (migrationSchema.isExist(migrationName)) {
      console.log(`running rollback ${migrationName} query`)
      await deleteMigration(migrationName)
      closeConnection()
    } else {
      console.error(`migration ${migrationSchema.getPath(migrationName)} is not exist`)
    }
  } catch (e) {
    console.log(e)
    closeConnection()
  }

}
