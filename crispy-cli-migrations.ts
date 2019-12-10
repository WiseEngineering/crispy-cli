#!/usr/bin/env node
import commander from 'commander'

import migrate from './src/commands/migrations/migrate'
import rollback from './src/commands/migrations/rollback'
import create from './src/commands/migrations/create'

commander
  .command('create <migrationName>', 'Create new migration')
  .action(create)

commander
  .command('migrate <migrationName>', 'Runs the specified migration')
  .action(migrate)

commander
  .command('rollback <migrationName>', 'Will undo the specified migration')
  .action(rollback)

commander.parse(process.argv)
