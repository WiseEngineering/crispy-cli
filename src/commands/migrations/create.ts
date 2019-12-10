
// NOTE should store code to create file in migrations directory based on config with following structure:

/*
version: [version]

up:
  table: [table]
  operation: [create|alter]
  runner: [mysql|pt-online-schema-change]
  query: >


down:
  table: [table]
  operation: [create|alter]
  runner: [mysql|pt-online-schema-change]
  query: >

*/

export default (migrationName: string): void => {
  console.log(`Creating migration ${migrationName} in migrations directory`)
}
