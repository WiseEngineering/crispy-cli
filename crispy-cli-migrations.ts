#!/usr/bin/env node
import commander from 'commander'
import { version, description } from './package.json'

import upAction from './src/commands/migrations/up'

commander
  .version(version)
  .description(description)
  .command('up <migrationName>', 'Migrate database to passed migration')
  .action(upAction)
  .parse(process.argv)
