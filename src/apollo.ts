import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import config from './config'
import nodeFetch from 'node-fetch';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: config.CrispyAPI?.url,
    fetch: nodeFetch,
    headers: {
      authorization: `bearer ${process.env.API_TOKEN}`,
    },
  } as HttpLink.Options),
  cache: new InMemoryCache(),
});
