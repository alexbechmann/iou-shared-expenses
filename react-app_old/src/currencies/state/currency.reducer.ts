import { CurrencyState } from './currency.state';
import { CurrencyType } from '@iou/core';
import { AppAction } from 'src/state/app-action';

const defaultState: CurrencyState = {
  avaiableCurrencies: [
    {
      name: 'GBP',
      id: CurrencyType.GBP
    },
    {
      name: 'EUR',
      id: CurrencyType.EUR
    },
    {
      name: 'USD',
      id: CurrencyType.USD
    },
    {
      name: 'DKK',
      id: CurrencyType.DKK
    }
  ]
};

export function currencyReducer(state: CurrencyState = defaultState, action: AppAction) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
