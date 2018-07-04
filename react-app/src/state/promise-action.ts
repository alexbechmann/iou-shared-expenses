import { action } from 'typesafe-actions';
import * as Parse from 'parse';

export function promiseAction<T extends string, P, M>(type: T, payload: Promise<P> | Parse.Promise<P>, meta?: M) {
  return action(type, (payload as any) as P, meta);
}
