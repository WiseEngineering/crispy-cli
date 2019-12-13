export type MigrationSchema = {
  table: string;
  operation: string;
  query: string
}

export type Schema = {
  version: number;
  up: MigrationSchema;
  down: MigrationSchema;
}
