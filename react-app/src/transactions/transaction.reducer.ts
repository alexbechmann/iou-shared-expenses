import { TransactionState } from './transaction.state';
import { AnyAction } from 'redux';
import { SAVING_TRANSACTION, SAVED_TRANSACTION, GETTING_TRANSACTIONS, GOT_TRANSACTIONS } from './transaction.actions';
import { Transaction } from '@shared/schema';

const defaultState: TransactionState = {
  savingTransaction: false,
  transactionError: '',
  allTransactions: [],
  gettingTransactions: false
};

export function transactionReducer(state: TransactionState = defaultState, action: AnyAction) {
  switch (action.type) {
    case SAVING_TRANSACTION: {
      const newState: TransactionState = Object.assign({}, state);
      newState.savingTransaction = true;
      return newState;
    }
    case SAVED_TRANSACTION: {
      const newState: TransactionState = Object.assign({}, state);
      newState.savingTransaction = false;
      if (action.payload instanceof Transaction) {
        newState.transactionError = '';
      } else if (action.payload instanceof Parse.Error) {
        newState.transactionError = (action.payload as Parse.Error).message;
      }
      return newState;
    }
    case GETTING_TRANSACTIONS: {
      const newState: TransactionState = Object.assign({}, state);
      newState.gettingTransactions = true;
      return newState;
    }
    case GOT_TRANSACTIONS: {
      const newState: TransactionState = Object.assign({}, state);
      newState.gettingTransactions = false;
      if (action.payload) {
        const receivedTransactions = action.payload as Transaction[];
        newState.allTransactions
          .filter(
            transaction =>
              receivedTransactions.some(receivedTransaction => receivedTransaction.id === transaction.id) === false
          )
          .concat(receivedTransactions);
      }
      return newState;
    }
    default: {
      return state;
    }
  }
}
