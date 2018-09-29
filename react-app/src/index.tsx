import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { createApolloClient } from './graphql/apollo-client';

const Root = props => (
  <ApolloProvider client={createApolloClient()}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
