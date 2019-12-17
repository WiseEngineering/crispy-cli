import fs from 'fs'
import yaml from 'js-yaml'

import config from '../../config'
import { getPath, isExist } from '../../migration'

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

  if (isExist(migrationName)) {
    console.error(`${migrationName} is already exist`)
  } else {
    const schemaConfig = {
      noRefs: true,
      styles: {
        '!!null': 'canonical'
      },
    };
    const yamlSchemaTemplate = yaml.safeDump(schemaTemplate, schemaConfig);
    fs.writeFileSync(
      getPath(migrationName),
      yamlSchemaTemplate, 'utf8');

    console.log(`Created migration ${migrationName} in ${config.migrationsDir} directory`)
  }
}
