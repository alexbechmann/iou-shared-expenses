import * as Parse from 'parse';
import { store } from 'src/state';
import { enrichUserProfileWithFacebook, findFriendsWithFacebook } from 'src/social/state/social.actions';
import { User } from 'parse';
import { LoginModel } from 'src/auth/login/models/login.model';
import { RegisterModel } from 'src/auth/register/models/register.model';
import { promiseAction } from '../../state/promise-action';
export const LOGGING_IN = 'IOU/LOGGING_IN';
export const LOGIN = 'IOU/LOGIN';
export const LOGOUT = 'IOU/LOGOUT';
export const REGISTERING = 'IOU/REGISTERING';
export const REGISTERED = 'IOU/REGISTERED';

export function loginWithFacebook() {
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
        store.dispatch(enrichUserProfileWithFacebook(user));
        store.dispatch(findFriendsWithFacebook(user));
        resolve(user);
      },
      error: (user, error) => {
        console.log('User cancelled the Facebook login or did not fully authorize.');
        reject(error);
      }
    });
  });
  return promiseAction(LOGIN, payload);
}

export function loginWithPassword(loginModel: LoginModel) {
  store.dispatch({
    type: LOGGING_IN
  });
  return promiseAction(LOGIN, Parse.User.logIn(loginModel.username, loginModel.password));
}

export function logout() {
  return promiseAction(LOGOUT, Parse.User.logOut());
}

export function register(registerModel: RegisterModel) {
  store.dispatch({
    type: REGISTERING
  });

  return promiseAction(REGISTERED, Parse.User.signUp(registerModel.username, registerModel.password, {
    email: registerModel.email
  }));
}
