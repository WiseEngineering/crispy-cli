#!/usr/bin/env node
import commander from 'commander'

import up from './src/commands/migrations/up'
import down from './src/commands/migrations/down'
import create from './src/commands/migrations/create'

commander
  .command('up <migrationName>', 'Runs the specified migration')
  .action(up)

commander
  .command('down <migrationName>', 'Will undo the specified migration')
  .action(down)

commander
  .command('create <migrationName>', 'Create new migration')
  .action(create)

commander.parse(process.argv)
