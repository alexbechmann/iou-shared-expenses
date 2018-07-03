import { Transaction, TransactionType, CurrencyType } from '@iou/core';
import { AnyAction } from 'redux';
import { store } from 'src/state';
import { nameof } from '@iou/core';
import * as Parse from 'parse';
import { createUserPointer } from 'src/parse/create-user-pointer';
import { change } from 'redux-form';
import { TransactionFormData } from '../edit/EditTransaction';

export const SAVING_TRANSACTION = 'IOU/SAVING_TRANSACTION';
export const SAVED_TRANSACTION = 'IOU/SAVED_TRANSACTION';
export const GETTING_TRANSACTIONS = 'IOU/GETTING_TRANSACTIONS';
export const GOT_TRANSACTIONS = 'IOU/GOT_TRANSACTIONS';
export const GOT_EDIT_TRANSACTION = 'IOU/GOT_EDIT_TRANSACTION';
export const GETTING_EDIT_TRANSACTION = 'IOU/GETTING_EDIT_TRANSACTION';

export function saveTransaction(transaction: Transaction): AnyAction {
  store.dispatch({
    type: SAVING_TRANSACTION
  });
  return {
    type: SAVED_TRANSACTION,
    payload: transaction.save()
  };
}

export function getTransactionsToUser(currentUserId: string, toUserId: string, excludeIds: string[] = []): AnyAction {
  store.dispatch({
    type: GETTING_TRANSACTIONS
  });

  const query1 = new Parse.Query(Transaction);
  query1.equalTo(nameof<Transaction>('fromUser'), createUserPointer(currentUserId));
  query1.equalTo(nameof<Transaction>('toUser'), createUserPointer(toUserId));
  // query1.notContainedIn(nameof<Transaction>('id'), excludeIds);

  const query2 = new Parse.Query(Transaction);
  query2.equalTo(nameof<Transaction>('toUser'), createUserPointer(currentUserId));
  query2.equalTo(nameof<Transaction>('fromUser'), createUserPointer(toUserId));
  // query2.notContainedIn(nameof<Transaction>('id'), excludeIds);

  const query = Parse.Query.or(query1, query2);
  query.include([nameof<Transaction>('toUser'), nameof<Transaction>('fromUser')]);

  return {
    type: GOT_TRANSACTIONS,
    payload: query.find()
  };
}

// export function resetTransactionFormReadyState(): AnyAction {
//   return {
//     type: RESET_EDIT_TRANSACTION_READY_STATE
//   }
// }

export function getTransactionAndSetEditFormValues(id: string, formName: string): AnyAction {
  store.dispatch({
    type: GETTING_EDIT_TRANSACTION
  });
  return {
    type: GOT_EDIT_TRANSACTION,
    payload: new Parse.Query(Transaction).get(id).then(transaction => {
      store.dispatch({
        type: GOT_EDIT_TRANSACTION,
        payload: transaction
      });
      const placeholderObj: Partial<TransactionFormData> = {
        id: '',
        title: '',
        amount: '',
        currencyId: CurrencyType.DKK,
        isSecure: false,
        transactionDate: new Date(),
        transactionType: TransactionType.IOU
      };
      Object.keys(placeholderObj).forEach(key => {
        store.dispatch(change(formName, key, transaction.get(key)));
      });
      store.dispatch(change(formName, nameof<TransactionFormData>('id'), transaction.id));
      store.dispatch(change(formName, nameof<TransactionFormData>('fromUserId'), transaction.getFromUser().id));
      store.dispatch(change(formName, nameof<TransactionFormData>('toUserId'), transaction.getToUser().id));
      return transaction;
    })
  };
}
