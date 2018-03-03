import { Transaction } from '@shared/schema';
import { AnyAction } from 'redux';
import { store } from '@shared/state';

export const SAVING_TRANSACTION = 'IOU/SAVING_TRANSACTION';
export const SAVED_TRANSACTION = 'IOU/SAVED_TRANSACTION';

export function saveTransaction(transaction: Transaction): AnyAction {
  store.dispatch({
    type: SAVING_TRANSACTION
  });
  return {
    type: SAVED_TRANSACTION,
    payload: transaction.save()
  };
}
