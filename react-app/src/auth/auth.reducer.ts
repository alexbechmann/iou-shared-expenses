import { User } from 'parse';
import * as Parse from 'parse';
import { PARSE_INITIALIZED } from 'src/parse';
import { LOGIN, LOGOUT } from './auth.actions';
import { AuthState } from 'src/auth';
import { AnyAction } from 'redux';

const defaultState: AuthState = {
  loginError: '',
  registerError: ''
};

export function authReducer(state: AuthState = defaultState, action: AnyAction) {
  switch (action.type) {
    case PARSE_INITIALIZED: {
      const newState: AuthState = Object.assign({}, state);
      newState.currentUser = Parse.User.current();
      return newState;
    }
    case LOGIN: {
      if (action.payload instanceof User) {
        const newState: AuthState = Object.assign({}, state);
        newState.currentUser = action.payload as User;
        return newState;
      } else {
        const newState: AuthState = Object.assign({}, state);
        newState.loginError = action.payload.message;
        return newState;
      }
    }
    case LOGOUT: {
      const newState: AuthState = Object.assign({}, state);
      newState.currentUser = Parse.User.current();
      return newState;
    }
    default: {
      return state;
    }
  }
}
