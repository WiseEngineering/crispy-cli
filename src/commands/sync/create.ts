import { runMutation } from './../../apollo'
import gql from 'graphql-tag'

export default (migrationName: string): void => {
  const mutatiton = gql`mutation CreateMigration($name: String!) {
    createMigration(name: $name) {
      id
    }
  }`

  runMutation(mutatiton, { name: migrationName })
}
