import * as execa from 'execa';
import config from './config'

// introspect GitHub API and save the result to `schema.json`
execa.sync('apollo-codegen', [
  'introspect-schema',
  config.CrispyAPI?.url,
  '--output',
  'schema.json',
  '--header',
  'Authorization: bearer ' + config.CrispyAPI?.apiKey,
]);
console.log('schema.json generated');

// inpsect actual queries in `index.ts` and generate TypeScript types in `schema.ts`
execa.sync('apollo-codegen', [
  'generate',
  'index.ts',
  '--schema',
  'schema.json',
  '--target',
  'typescript',
  '--tag-name',
  'gql',
  '--output',
  'schema.ts',
  '--add-typename',
]);
console.log('schema.ts generated');
