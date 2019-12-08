#!/usr/bin/env node
import commander from 'commander'

import { version, description } from './package.json'

commander
  .version(version)
  .description(description)
  .command('migrations', 'Operate with Crispy migrations').alias('m')
  .parse(process.argv)
