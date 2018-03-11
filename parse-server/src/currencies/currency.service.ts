import { CurrencyType, Currency } from '@iou/core';

export class CurrencyService {
  getAllCurrenyTypes(): CurrencyType[] {
    return Object.keys(CurrencyType).map(key => {
      return CurrencyType[key];
    });
  }

  getAllCurrencies(): Currency[] {
    return this.getAllCurrenyTypes().map(type => {
      return {
        name: CurrencyType[type],
        id: type
      };
    });
  }
}
