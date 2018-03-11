import { Currency } from './currency';

export interface Settlement {
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: Currency;
}
