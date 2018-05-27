import { Transaction } from '@iou/core';
import { createUserPointer } from '../shared/pointer.factory';
import { nameof } from '@iou/core';

export class TransactionService {
  async allTransactionsBetweenUsers(fromUserId: string, toUserId: string): Promise<Transaction[]> {
    const query1 = new Parse.Query(Transaction);
    query1.equalTo(nameof<Transaction>('fromUser'), createUserPointer(fromUserId));
    query1.equalTo(nameof<Transaction>('toUser'), createUserPointer(toUserId));

    const query2 = new Parse.Query(Transaction);
    query2.equalTo(nameof<Transaction>('toUser'), createUserPointer(fromUserId));
    query2.equalTo(nameof<Transaction>('fromUser'), createUserPointer(toUserId));

    return await Parse.Query.or(query1, query2)
      .limit(9999999999)
      .find();
  }
}
