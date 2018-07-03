import { action } from 'typesafe-actions';
import * as Parse from 'parse';

export function promiseAction<T extends string, P>(type: T, payload: Promise<P> | Parse.Promise<P>) {
  return action(type, (payload as any) as P);
}
