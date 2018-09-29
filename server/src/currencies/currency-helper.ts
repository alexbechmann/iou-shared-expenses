import { CurrencyType } from './currency-type';

export const currencyHelper = {
  formatAmount: (amount: number, currencyId: CurrencyType) => {
    switch (currencyId) {
      case CurrencyType.GBP: {
        return `£${amount.toFixed(2)}`;
      }
      case CurrencyType.EUR: {
        return `€${amount.toFixed(2)}`;
      }
      case CurrencyType.USD: {
        return `$${amount.toFixed(2)}`;
      }
      case CurrencyType.DKK: {
        return `${amount.toFixed(2)}, kr`;
      }
      default: {
        return '';
      }
    }
  },
  buildCurrency: (currencyId: CurrencyType) => {
    switch (currencyId) {
      case CurrencyType.GBP: {
        return {
          typeId: currencyId,
          name: 'GBP'
        };
      }
      case CurrencyType.EUR: {
        return {
          typeId: currencyId,
          name: 'EUR'
        };
      }
      case CurrencyType.USD: {
        return {
          typeId: currencyId,
          name: 'USD'
        };
      }
      case CurrencyType.DKK: {
        return {
          typeId: currencyId,
          name: 'DKK'
        };
      }
      default: {
        return '';
      }
    }
  }
};
