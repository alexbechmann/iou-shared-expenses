import { createStore, applyMiddleware } from 'redux';
import { Store } from 'redux';
import { AppState } from './app.state';
import { rootReducer } from './root.reducer';
import promiseMiddleware from './redux-promise-middleware';
// import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

export const store: Store<AppState> = createStoreWithMiddleware(rootReducer) as Store<AppState>;
