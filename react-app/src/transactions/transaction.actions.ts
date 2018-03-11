import { Transaction } from '@shared/schema';
import { AnyAction } from 'redux';
import { store } from '@shared/state';
import { nameof } from '@iou/core';
import { createUserPointer } from '../parse';
import * as Parse from 'parse';

export const SAVING_TRANSACTION = 'IOU/SAVING_TRANSACTION';
export const SAVED_TRANSACTION = 'IOU/SAVED_TRANSACTION';
export const GETTING_TRANSACTIONS = 'IOU/GETTING_TRANSACTIONS';
export const GOT_TRANSACTIONS = 'IOU/GOT_TRANSACTIONS';

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

  const query1 = new Parse.Query<Transaction>(Transaction);
  query1.equalTo(nameof<Transaction>('fromUser'), createUserPointer(currentUserId));
  query1.equalTo(nameof<Transaction>('toUser'), createUserPointer(toUserId));
  query1.notContainedIn(nameof<Transaction>('id'), excludeIds);

  const query2 = new Parse.Query<Transaction>(Transaction);
  query2.equalTo(nameof<Transaction>('toUser'), createUserPointer(currentUserId));
  query2.equalTo(nameof<Transaction>('fromUser'), createUserPointer(toUserId));
  query2.notContainedIn(nameof<Transaction>('id'), excludeIds);

  const query = Parse.Query.or(query1, query2);

  return {
    type: GOT_TRANSACTIONS,
    payload: query.find()
  };
}
