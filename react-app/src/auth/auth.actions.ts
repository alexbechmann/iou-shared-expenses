import { User } from "parse";
import * as Parse from 'parse';
import { Action } from "redux";

export const LOGIN = "IOU/LOGIN";
export const LOGOUT = "IOU/LOGOUT";

export function loginWithFacebook(): Action {
  const payload = new Promise<User>((resolve, reject) => {
    Parse.FacebookUtils.logIn(null, {
      success: (user: User) => {
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!");
        } else {
          console.log("User logged in through Facebook!");
        }
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
  } as Action;
}

export function loginWithPassword(username: string, password: string): Action {
  return {
    type: LOGIN,
    payload: Parse.User.logIn(username, password)
  } as Action;
}

export function logout(): Action {
  return {
    type: LOGOUT,
    payload: Parse.User.logOut()
  } as Action;
}
