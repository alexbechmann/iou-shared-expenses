import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { store } from 'src/state';
import { Provider } from 'react-redux';
import { App } from './App';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
