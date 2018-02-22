import { TransactionType } from "../shared/transaction-type";
import { Object, Pointer } from 'parse';

export class Transaction extends Object {
  constructor() {
    super("Transaction");
  }

  get fromUser(): Pointer {
    return this.get('fromUser');
  }
  set fromUser(value: Pointer ) {
   this.set('fromUser', value);
  }
  
  get toUser(): Pointer  {
    return this.get('toUser');
  }
  set toUser(value: Pointer ) {
   this.set('toUser', value);
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