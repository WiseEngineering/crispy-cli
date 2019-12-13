import fs from 'fs'
import yaml from 'js-yaml'

import config from '../../config'
import { Schema } from '../../migration'
const version = 1.0
const migrationTemplate = {
  table: '',
  operation: '',
  query: ''
}
const schemaTemplate = <Schema>{
  version,
  up: migrationTemplate,
  down: migrationTemplate
};

export default (migrationName: string): void => {
  const migrationPath = `${config.migrationsDir}/${migrationName}.yml`;

  if (fs.existsSync(migrationPath)) {
    console.error(`${migrationName} is already exist`)
  } else {
    const yamlSchemaTemplate = yaml.safeDump(schemaTemplate, { noRefs: true });
    fs.writeFileSync(migrationPath, yamlSchemaTemplate, 'utf8');

    console.log(`Created migration ${migrationName} in ${config.migrationsDir} directory`)
  }
}
