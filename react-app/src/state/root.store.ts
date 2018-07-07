import { createStore, applyMiddleware } from 'redux';
import { Store } from 'redux';
import { AppState } from './app.state';
import { rootReducer } from './root.reducer';
import * as ReduxPromise from 'redux-promise';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export const store: Store<AppState> = createStoreWithMiddleware(rootReducer) as Store<AppState>;
