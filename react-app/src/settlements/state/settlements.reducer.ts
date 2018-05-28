import { SettlementsState } from './settlements.state';
import { GETTING_SETTLEMENTS, GET_SETTLEMENTS } from './settlements.actions';
import { Settlement } from '@iou/core';
import { AnyAction } from 'redux';

const defaultState: SettlementsState = {
  gettingSettlements: false,
  allSettlements: []
};

export function settlementsReducer(state: SettlementsState = defaultState, action: AnyAction) {
  switch (action.type) {
    case GETTING_SETTLEMENTS: {
      const newState = Object.assign({}, state);
      newState.gettingSettlements = true;
      return newState;
    }
    case GET_SETTLEMENTS: {
      const newState = Object.assign({}, state);
      const receivedSettlements = action.payload as Settlement[];
      newState.allSettlements = newState.allSettlements
        .filter(
          transaction =>
            receivedSettlements.some(receivedSettlement => receivedSettlement.toUserId === transaction.toUserId) ===
            false
        )
        .concat(receivedSettlements);
      newState.gettingSettlements = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}
