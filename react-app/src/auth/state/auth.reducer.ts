import { User } from 'parse';
import * as Parse from 'parse';
import { PARSE_INITIALIZED } from 'src/parse/state/parse.actions';
import { LOGIN, LOGOUT, REGISTERED, LOGGING_IN, REGISTERING } from './auth.actions';
import { AuthState } from 'src/auth/state/auth.state';
import { AnyAction } from 'redux';

const defaultState: AuthState = {
  loginError: '',
  registerError: '',
  loggingIn: false,
  registering: false
};

export function authReducer(state: AuthState = defaultState, action: AnyAction) {
  switch (action.type) {
    case PARSE_INITIALIZED: {
      const newState: AuthState = Object.assign({}, state);
      newState.currentUser = Parse.User.current();
      return newState;
    }
    case LOGGING_IN: {
      const newState: AuthState = Object.assign({}, state);
      newState.loggingIn = true;
      return newState;
    }
    case REGISTERING: {
      const newState: AuthState = Object.assign({}, state);
      newState.registering = true;
      return newState;
    }
    case LOGIN:
    case REGISTERED: {
      if (action.payload instanceof User) {
        const newState: AuthState = Object.assign({}, state);
        newState.currentUser = action.payload as User;
        return newState;
      } else {
        const newState: AuthState = Object.assign({}, state);
        if (action.type === LOGIN) {
          newState.loginError = action.payload.message;
          newState.loggingIn = false;
        } else if (action.type === REGISTERED) {
          newState.registerError = action.payload.message;
          newState.registering = false;
        }
        return newState;
      }
    }
    case LOGOUT: {
      const newState: AuthState = Object.assign({}, state);
      newState.currentUser = undefined;
      return newState;
    }
    default: {
      return state;
    }
  }
}
