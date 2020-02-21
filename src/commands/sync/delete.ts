import { runMutation } from './../../apollo'
import gql from 'graphql-tag'

export default (migrationId: string): void => {
  const mutatiton = gql`mutation DeleteMigration($id: ID!) {
    deleteMigration(id: $id) {
      id
    }
  }`

  runMutation(mutatiton, { id: migrationId })
}
