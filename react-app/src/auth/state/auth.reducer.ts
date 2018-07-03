import { User } from 'parse';
import * as Parse from 'parse';
import { PARSE_INITIALIZED } from 'src/parse/state/parse.actions';
import { LOGIN, LOGOUT, REGISTERED, LOGGING_IN, REGISTERING } from './auth.actions';
import { AuthState } from 'src/auth/state/auth.state';
import { AppAction } from 'src/state/app-action';

const defaultState: AuthState = {
  loginError: '',
  registerError: '',
  loggingIn: false,
  registering: false
};

export function authReducer(state: AuthState = defaultState, action: AppAction): AuthState {
  switch (action.type) {
    case PARSE_INITIALIZED: {
      return {
        ...state,
        currentUser: Parse.User.current()
      };
    }
    case LOGGING_IN: {
      return {
        ...state,
        loggingIn: true
      };
    }
    case REGISTERING: {
      return {
        ...state,
        registering: true
      };
    }
    case LOGIN:
    case REGISTERED: {
      if (action.payload instanceof User) {
        return {
          ...state,
          currentUser: action.payload
        };
      } else {
        const error = action.payload as Parse.Error;
        if (action.type === LOGIN) {
          return {
            ...state,
            loginError: error.message,
            loggingIn: false
          };
        } else if (action.type === REGISTERED) {
          return {
            ...state,
            registerError: error.message,
            registering: false
          };
        }
        return {
          ...state
        };
      }
    }
    case LOGOUT: {
      return {
        ...state,
        currentUser: undefined
      };
    }
    default: {
      return state;
    }
  }
}
