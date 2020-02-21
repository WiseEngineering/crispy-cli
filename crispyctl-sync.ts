#!/usr/bin/env node
import sync from 'commander'

import createMigration from './src/commands/sync/create'
import deleteMigration from './src/commands/sync/delete'
import readMigrations from './src/commands/sync/read'
import updateMigration from './src/commands/sync/update'

sync
  .command('create <migrationName>')
  .description('Create the specified migration on API')
  .action(createMigration)

sync
  .command('delete <migrationName>')
  .description('Delete the specified migration on API')
  .action(deleteMigration)

sync
  .command('read')
  .description('Read migrations')
  .action(readMigrations)

sync
  .command('update <migrationName>')
  .description('Delete the specified migration on API')
  .action(updateMigration)

sync.parse(process.argv)
