//Run next migration or specified one
import { deleteMigration, getLastMigration } from './../../models/migrations'
import migrationSchema from './../../migration-schema'
import { createConnection, closeConnection } from '../../mysql'
import { rollback } from '../../runner'

const runMigrations = async (migrationsToRun: string[]): Promise<void> => {
  for (const migrationName of migrationsToRun) {

    await rollback(migrationName)
    console.log(`running migrate ${migrationName} query`)

    await deleteMigration(migrationName)
  }
}

export default async (migrationName: string): Promise<void> => {
  createConnection()

  // TODO: need to cover those points(mostly the same for `migrate`):
  // * is migration exist
  // * is migration syntax right
  // * use migrations transaction to be sure we are in sync with running query
  try {
    if (migrationSchema.isExist(migrationName)) {
      const lastMigration = await getLastMigration()

      const migrationsToRollback = migrationSchema.getMigrationsToRollback(
        lastMigration ? lastMigration.name : null,
        migrationName)
      await runMigrations(migrationsToRollback)

    } else {
      console.error(`migration ${migrationSchema.getPath(migrationName)} is not exist`)
    }
  } catch (e) {
    console.log(e)
  } finally {
    closeConnection()
  }
}
