#!/usr/bin/env node
import commander from 'commander'

import up from './src/commands/migrations/up'
import down from './src/commands/migrations/down'
import sync from './src/commands/migrations/sync'
import publish from './src/commands/migrations/publish'
import create from './src/commands/migrations/create'

commander
  .command('up <migrationName>')
  .action(up)

commander
  .command('down <migrationName>')
  .action(down)

commander
  .command('publish <migrationName>')
  .action(publish)

commander
  .command('create <migrationName>')
  .action(create)

commander
  .command('sync>')
  .action(sync)

commander.parse(process.argv)
