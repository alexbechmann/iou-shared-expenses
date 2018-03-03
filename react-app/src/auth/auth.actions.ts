import { User } from 'parse';
import * as Parse from 'parse';
import { store } from '@shared/state';
import { AnyAction } from 'redux';
import { RegisterModel } from './register/register.model';
import { LoginModel } from './login/login.model';

export const LOGGING_IN = 'IOU/LOGGING_IN';
export const LOGIN = 'IOU/LOGIN';
export const LOGOUT = 'IOU/LOGOUT';
export const REGISTERING = 'IOU/REGISTERING';
export const REGISTERED = 'IOU/REGISTERED';

export function loginWithFacebook(): AnyAction {
  store.dispatch({
    type: LOGGING_IN
  });
  const payload = new Promise<User>((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: (user: User) => {
        if (!user.existed()) {
          console.log('User signed up and logged in through Facebook!');
        } else {
          console.log('User logged in through Facebook!');
        }
        console.log(user.attributes);
        resolve(user);
      },
      error: (user, error) => {
        console.log('User cancelled the Facebook login or did not fully authorize.');
        reject(error);
      }
    });
  });
  return {
    type: LOGIN,
    payload: payload
  };
}

export function loginWithPassword(loginModel: LoginModel): AnyAction {
  store.dispatch({
    type: LOGGING_IN
  });
  return {
    type: LOGIN,
    payload: Parse.User.logIn(loginModel.username, loginModel.password)
  };
}

export function logout(): AnyAction {
  return {
    type: LOGOUT,
    payload: Parse.User.logOut()
  };
}

export function register(registerModel: RegisterModel): AnyAction {
  store.dispatch({
    type: REGISTERING
  });

  return {
    type: REGISTERED,
    payload: Parse.User.signUp(registerModel.username, registerModel.password, {
      email: registerModel.email
    })
  };
}
