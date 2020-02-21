import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import 'cross-fetch/polyfill'
import config from './config'
import { query } from './mysql'
import gql from 'graphql-tag'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: config.CrispyAPI?.url,
    fetch,
  }),
  cache: new InMemoryCache(),
})

export const runMutation = async (mutation: any, variables: any = {}): Promise<any> => {
 return await client.mutate({ mutation, variables })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

export const runQuery = async (query: any, variables: any = {}): Promise<any> => {
  return await client.query({ query, variables })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
