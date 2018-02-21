import { SettlementsState } from "./settlements.state";
import { GETTING_SETTLEMENTS, GET_SETTLEMENTS } from "./settlements.actions";
import { SettlementOverview } from "@iou/core";
import { AnyAction } from "redux";

const defaultState: SettlementsState = {
  gettingSettlements: false,
  overviews: []
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
      newState.overviews = action.payload as SettlementOverview[];
      newState.gettingSettlements = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}
