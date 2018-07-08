import { ActionType } from 'typesafe-actions';

import * as authActions from 'src/auth/state/auth.actions';
import * as settlementActions from 'src/settlements/state/settlements.actions';
import * as parseActions from 'src/parse/state/parse.actions';
import * as socialActions from 'src/social/state/social.actions';
import * as transactionActions from 'src/transactions/state/transaction.actions';

export type AppAction = ActionType<
  typeof authActions | typeof settlementActions | typeof parseActions | typeof socialActions | typeof transactionActions
>;
