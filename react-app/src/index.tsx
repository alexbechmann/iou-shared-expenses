import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { store } from 'src/state';
import { Provider } from 'react-redux';
import App from './App';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
