import * as Parse from 'parse';
import { Settlement, CLOUD_FUNCTION_GET_SETTLEMENTS_BETWEEN_USERS } from '@iou/core';
import { store } from 'src/state';
import { createStandardAction } from 'typesafe-actions';
import { promiseAction } from '../../state/promise-action';

export const GET_SETTLEMENTS = 'IOU/GET_SETTLEMENTS';
export const GETTING_SETTLEMENTS = 'IOU/GETTING_SETTLEMENTS';

export const gettingSettlements = createStandardAction(GETTING_SETTLEMENTS)();

export function getSettlementsToUser(toUserId: string) {
  store.dispatch(gettingSettlements());

  const payload: Promise<Settlement[]> = new Promise((resolve, reject) => {
    Parse.Cloud.run(CLOUD_FUNCTION_GET_SETTLEMENTS_BETWEEN_USERS, {
      toUserId
    }).then(result => {
      resolve(result);
    });
  });

  return promiseAction(GET_SETTLEMENTS, payload);
}
