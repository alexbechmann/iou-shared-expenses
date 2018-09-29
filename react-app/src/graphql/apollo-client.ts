import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError, ErrorResponse } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

export const createApolloClient = () => {
  const httpLink = new HttpLink({ uri: `http://localhost:3400/graphql` });
  const withTokenLink = setContext((operation, { headers }) =>
    Promise.resolve({
      headers: {
        ...headers,
        authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  );
  const handleAuthErrorLink = onError(({ networkError, operation, forward }: ErrorResponse) => {
    if (networkError) {
      switch ((networkError as any).statusCode) {
        case 401: {
          console.log('login here');
          break;
        }
        default: {
          break;
        }
      }
    }
    return forward(operation);
  });
  const link = ApolloLink.from([withTokenLink, handleAuthErrorLink, httpLink]);
  const cache = new InMemoryCache();
  return new ApolloClient({
    link,
    cache
  });
};
