import { CurrencyState } from './currency.state';
import { CurrencyType } from '@iou/core';
import { AnyAction } from 'redux';

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

export function currencyReducer(state: CurrencyState = defaultState, action: AnyAction) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
