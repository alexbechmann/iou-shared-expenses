import { AuthState } from 'src/auth';
import { ParseState } from 'src/parse';
import { SocialState } from 'src/social';
import { SettlementsState } from 'src/settlements';
import { CurrencyState } from 'src/currencies';
import { FormReducer } from 'redux-form';

export interface AppState {
  auth: AuthState;
  parse: ParseState;
  social: SocialState;
  settlements: SettlementsState;
  currency: CurrencyState;
  form: FormReducer;
}
