import * as Parse from 'parse';
import { TransactionType } from '../shared/transaction-type';

export class Transaction extends Parse.Object {
  fromUser: Parse.Pointer | Parse.User;
  toUser: Parse.Pointer | Parse.User;

  constructor() {
    super('Transaction');
  }

  getFromUserPointer(): Parse.Pointer {
    return this.get('fromUser');
  }
  setFromUserPointer(value: Parse.Pointer) {
    this.set('fromUser', value);
  }

  getFromUser(): Parse.User {
    return this.get('fromUser');
  }

  geToUserPointer(): Parse.Pointer {
    return this.get('toUser');
  }
  setToUserPointer(value: Parse.Pointer) {
    this.set('toUser', value);
  }

  getToUser(): Parse.User {
    return this.get('toUser');
  }

  get isSecure(): boolean {
    return this.get('isSecure');
  }
  set isSecure(value: boolean) {
    this.set('isSecure', value);
  }

  get currencyId(): number {
    return this.get('currencyId');
  }
  set currencyId(value: number) {
    this.set('currencyId', value);
  }

  get transactionDate(): Date {
    return this.get('transactionDate');
  }
  set transactionDate(value: Date) {
    this.set('transactionDate', value);
  }

  get purchaseTransactionLinkUUID(): string {
    return this.get('purchaseTransactionLinkUUID');
  }
  set purchaseTransactionLinkUUID(value: string) {
    this.set('purchaseTransactionLinkUUID', value);
  }

  get amount(): number {
    return this.get('amount');
  }
  set amount(value: number) {
    this.set('amount', value);
  }

  get title(): string {
    return this.get('title');
  }
  set title(value: string) {
    this.set('title', value);
  }

  get transactionType(): TransactionType {
    return this.get('transactionType');
  }
  set transactionType(value: TransactionType) {
    this.set('transactionType', value);
  }
}
