import isPromise from 'is-promise';
import { isFSA } from 'flux-standard-action';

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }

    if (isPromise(action.payload)) {
      action.payload.then(result => dispatch({ ...action, payload: result }));
      // .catch(error => {
      return action;
    } else {
      return next(action);
    }
  };
}
