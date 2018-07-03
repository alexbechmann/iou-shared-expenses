import { SettlementsState } from './settlements.state';
import { GETTING_SETTLEMENTS, GET_SETTLEMENTS } from './settlements.actions';
import { Settlement } from '@iou/core';
import { AppAction } from 'src/state/app-action';

const defaultState: SettlementsState = {
  gettingSettlements: false,
  allSettlements: []
};

export function settlementsReducer(state: SettlementsState = defaultState, action: AppAction): SettlementsState {
  switch (action.type) {
    case GETTING_SETTLEMENTS: {
      return {
        ...state,
        gettingSettlements: true
      };
    }
    case GET_SETTLEMENTS: {
      const receivedSettlements: Settlement[] = action.payload;
      return {
        ...state,
        allSettlements: state.allSettlements
          .filter(
            transaction =>
              receivedSettlements.some(receivedSettlement => receivedSettlement.toUserId === transaction.toUserId) ===
              false
          )
          .concat(receivedSettlements),
        gettingSettlements: false
      };
    }
    default: {
      return state;
    }
  }
}
