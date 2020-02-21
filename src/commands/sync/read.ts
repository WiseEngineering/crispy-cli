import { runQuery } from './../../apollo'
import gql from 'graphql-tag'

export default (): void => {
  const query = gql`query {
    migrations {
      name
      id
    }
  }`

  runQuery(query)
}
