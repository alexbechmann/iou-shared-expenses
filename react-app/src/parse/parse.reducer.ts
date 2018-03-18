import { Action } from 'redux';
import { ParseState } from './parse.state';
import { PARSE_INITIALIZED } from './parse.actions';
import * as Parse from 'parse';

const defaultState: ParseState = {
  initialized: false
};

export function parseReducer(state: ParseState = defaultState, action: Action) {
  switch (action.type) {
    case PARSE_INITIALIZED: {
      return {
        initialized: true
      };
    }
    default: {
      return state;
    }
  }
}
