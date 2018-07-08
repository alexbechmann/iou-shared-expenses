import { action } from 'typesafe-actions';
import * as Parse from 'parse';

export function promiseAction<T extends string, P, M>(type: T, payload: Promise<P>, meta?: M) {
  return action(type, (payload as any) as P, meta);
}

export function parsePromiseAction<T extends string, P, M = undefined>(type: T, payload: Parse.Promise<P>, meta?: M) {
  const m = meta as M;
  return {
    type: type,
    payload: (payload as any) as P | Parse.Error,
    meta: {
      ...(m as any),
      promise: payload
    } as M & {
      promise: Parse.Promise<P>;
    }
  };
}
