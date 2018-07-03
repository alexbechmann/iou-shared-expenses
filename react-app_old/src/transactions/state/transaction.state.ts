import { Transaction } from '@iou/core';

export interface TransactionState {
  savingTransaction: boolean;
  transactionError: string;
  gettingTransactions: boolean;
  allTransactions: Transaction[];
  loadingEditTransaction: boolean;
}
