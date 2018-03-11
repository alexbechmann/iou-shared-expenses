import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import { AppState } from './app.state';
import { authReducer } from 'src/auth';
import { parseReducer } from 'src/parse';
import { socialReducer } from 'src/social';
import { settlementsReducer } from 'src/settlements';
import { reducer as formReducer } from 'redux-form';
import { currencyReducer } from 'src/currencies';
import { transactionReducer } from 'src/transactions';

export const rootReducer: Reducer<AppState> = combineReducers({
  auth: authReducer,
  parse: parseReducer,
  social: socialReducer,
  settlements: settlementsReducer,
  form: formReducer,
  currency: currencyReducer,
  transactions: transactionReducer
});
