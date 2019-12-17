#!/usr/bin/env node
import migrations from 'commander'

import migrate from './src/commands/migrations/migrate'
import rollback from './src/commands/migrations/rollback'
import create from './src/commands/migrations/create'

migrations
  .command('migrate <migrationName>')
  .description('Runs the specified migration')
  .action(migrate)

migrations
  .command('rollback <migrationName>')
  .description('Will undo the specified migration')
  .action(rollback)

migrations
  .command('create <migrationName>')
  .description('Create new migration')
  .action(create)

migrations.parse(process.argv);
