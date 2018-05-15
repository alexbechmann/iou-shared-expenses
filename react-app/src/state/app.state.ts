import { AuthState } from 'src/auth/state/auth.state';
import { ParseState } from 'src/parse/state/parse.state';
import { SocialState } from 'src/social/state/social.state';
import { SettlementsState } from 'src/settlements/state/settlements.state';
import { CurrencyState } from 'src/currencies/state/currency.state';
import { FormReducer } from 'redux-form';
import { TransactionState } from 'src/transactions/state/transaction.state';

export interface AppState {
  auth: AuthState;
  parse: ParseState;
  social: SocialState;
  settlements: SettlementsState;
  currency: CurrencyState;
  form: FormReducer;
  transactions: TransactionState;
}
