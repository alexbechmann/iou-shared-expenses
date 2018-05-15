import { AuthState } from 'src/auth';
import { ParseState } from 'src/parse';
import { SocialState } from 'src/social';
import { SettlementsState } from 'src/settlements';
import { CurrencyState } from 'src/currencies';
import { FormReducer } from 'redux-form';
import { TransactionState } from '../../transactions/transaction.state';

export interface AppState {
  auth: AuthState;
  parse: ParseState;
  social: SocialState;
  settlements: SettlementsState;
  currency: CurrencyState;
  form: FormReducer;
  transactions: TransactionState;
}
