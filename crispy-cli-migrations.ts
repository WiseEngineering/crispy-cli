#!/usr/bin/env node
import commander from 'commander'

import upAction from './src/commands/migrations/up'

commander
  .command('up <migrationName>')
  .action(upAction)

commander.parse(process.argv)
