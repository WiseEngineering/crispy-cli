//Run next migration or specified one
import { initTable, startMigration, finishMigration, deleteMigration, getLastMigration } from './../../models/migrations'
import { createConnection, closeConnection } from '../../mysql'
import migrationSchema from '../../migration-schema'
import { run } from '../../runner'

const runMigrations = async (migrationsToRun: string[]): Promise<void> => {
  for (const migrationName of migrationsToRun) {
    try {
      await startMigration(migrationName)

      await run(migrationName)
      console.log(`running migrate ${migrationName} query`)

      await finishMigration(migrationName)
    } catch (e) {
      console.log('running migration', e)
      await deleteMigration(migrationName)
      break
    }

  }
}

export default async (migrationName: string): Promise<void> => {
  try {
    createConnection()

    // TODO: need to cover those points:
    // * is migration syntax right
    // * use migrations transaction to be sure we are in sync with running query
    if (migrationSchema.isExist(migrationName)) {
      await initTable()

      const lastMigration = await getLastMigration()

      const migrationsToRun = migrationSchema.getMigrationsToRun(
        lastMigration ? lastMigration.name : null,
        migrationName)

      await runMigrations(migrationsToRun)

    } else {
      console.error(`migration ${migrationSchema.getPath(migrationName)} is not exist`)
    }
  } catch (e) {
    // TODO: add logging module
    console.error(e)
  } finally {
    closeConnection()
  }
}
