//NOTE: run down migration or specified one

export default (migrationName: string): void => {
  console.log(`rollback to ${migrationName}`)
}
