import { combineReducers } from 'redux';
import { Reducer } from 'redux';
import { AppState } from './app.state';
import { authReducer } from 'src/auth/state/auth.reducer';
import { parseReducer } from 'src/parse/state/parse.reducer';
import { socialReducer } from 'src/social/state/social.reducer';
import { settlementsReducer } from 'src/settlements/state/settlements.reducer';
import { reducer as formReducer } from 'redux-form';
import { currencyReducer } from 'src/currencies/state/currency.reducer';
import { transactionReducer } from 'src/transactions/state/transaction.reducer';

export const rootReducer: Reducer<AppState> = combineReducers({
  auth: authReducer,
  parse: parseReducer,
  social: socialReducer,
  settlements: settlementsReducer,
  form: formReducer,
  currency: currencyReducer,
  transactions: transactionReducer
});
