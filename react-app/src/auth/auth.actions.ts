import { User } from "parse";
import * as Parse from 'parse';
import { store } from "@shared/index";
import { AnyAction } from "redux";

export const LOGIN = "IOU/LOGIN";
export const LOGOUT = "IOU/LOGOUT";
export const REGISTERING = "IOU/REGISTERING";
export const REGISTERED = "IOU/REGISTERED";

export function loginWithFacebook(): AnyAction {
  const payload = new Promise<User>((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: (user: User) => {
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!");
        } else {
          console.log("User logged in through Facebook!");
        }
        console.log(user.attributes);
        resolve(user);
      },
      error: (user, error) => {
        console.log("User cancelled the Facebook login or did not fully authorize.");
        reject(error);
      }
    });
  });

  return {
    type: LOGIN,
    payload: payload
  };
}

export function loginWithPassword(username: string, password: string): AnyAction {
  return {
    type: LOGIN,
    payload: Parse.User.logIn(username, password)
  };
}

export function logout(): AnyAction {
  return {
    type: LOGOUT,
    payload: Parse.User.logOut()
  };
}

export function register(username: string, email: string, password: string): AnyAction {
  store.dispatch({
    type: REGISTERING
  });

  return {
    type: REGISTERED,
    payload: Parse.User.signUp(username, password, {
      email: email
    })
  };
}
