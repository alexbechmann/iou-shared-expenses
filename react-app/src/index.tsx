import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { store } from '@shared/index';
import { Provider } from 'react-redux';
import { AppContainer } from "./AppContainer";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const Root = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
