import { Transaction } from '@shared/schema';

export interface TransactionState {
  savingTransaction: boolean;
  transactionError: string;
  gettingTransactions: boolean;
  allTransactions: Transaction[];
}
