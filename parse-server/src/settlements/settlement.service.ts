import { SocialService } from '../social/social.service';
import { User } from 'parse';
import { createUserPointer } from '../shared/pointer.factory';
import { Settlement, Currency, CurrencyType } from '@iou/core';
import { Transaction } from '../shared/schema';
import { CurrencyService } from '../currencies/currency.service';
import { TransactionService } from '../transactions/transaction.service';

export class SettlementService {
  currencyService: CurrencyService;
  transactionService: TransactionService;

  constructor() {
    this.currencyService = new CurrencyService();
    this.transactionService = new TransactionService();
  }

  async getSettlementsBetween(fromUserId: string, toUserId: string): Promise<Settlement[]> {
    const allTransactions: Transaction[] = await this.transactionService.allTransactionsBetweenUsers(
      fromUserId,
      toUserId
    );
    var settlements: Settlement[] = [];

    for (let currency of this.currencyService.getAllCurrencies()) {
      const transactionsForCurrency: Transaction[] = allTransactions.filter(
        transaction => transaction.get('currencyId') === currency.id
      );
      if (transactionsForCurrency.length > 0) {
        const settlement: Settlement = {
          fromUserId,
          toUserId,
          currency,
          amount: 0
        };
        for (let transaction of transactionsForCurrency) {
          settlement.amount += parseInt(transaction.get('amount'));
        }
        settlements.push(settlement);
      }
    }

    return settlements.map(settlement => {
      return {
        ...settlement,
        amount: parseInt(settlement.amount.toFixed(2))
      };
    });
  }
}
