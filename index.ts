#!/usr/bin/env node

import commander from 'commander'
import { version, description } from './package.json'

commander
    .version(version)
    .description(description)
    .parse(process.argv)
