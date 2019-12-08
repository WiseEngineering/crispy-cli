#!/usr/bin/env node
import commander from 'commander'

import up from './src/commands/migrations/up'
import down from './src/commands/migrations/down'
import sync from './src/commands/migrations/sync'
import publish from './src/commands/migrations/publish'
import create from './src/commands/migrations/create'

commander
  .command('up <migrationName>', 'Runs the specified migration')
  .action(up)

commander
  .command('down <migrationName>', 'Will undo the specified migration')
  .action(down)

commander
  .command('publish <migrationName>', 'Send specified migration to server')
  .action(publish)

commander
  .command('create <migrationName>', 'Create new migration')
  .action(create)

commander
  .command('sync', 'Sync migrations directory with server')
  .action(sync)

commander.parse(process.argv)
