import fs from 'fs'
import yaml from 'js-yaml'

import config from '../../config'
import { getPath } from '../../migration-schema'

const version = 1.0
const migrationTemplate = {
  table: null,
  operation: null,
  query: null
}
const schemaTemplate = {
  version,
  up: migrationTemplate,
  down: migrationTemplate
};

export default (migrationName: string): void => {
  const time = new Date().getTime()
  const fullMigrationName = `${time}_${migrationName}`

  const schemaConfig = {
    noRefs: true,
    styles: {
      '!!null': 'canonical'
    },
  };

  const yamlSchemaTemplate = yaml.safeDump(schemaTemplate, schemaConfig);
  fs.writeFileSync(
    getPath(fullMigrationName),
    yamlSchemaTemplate, 'utf8');

  console.log(`Created migration ${fullMigrationName} in ${config.migrationsDir} directory`)
}
