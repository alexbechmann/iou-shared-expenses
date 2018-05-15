import * as Parse from 'parse';
import { Settlement, CLOUD_FUNCTION_GET_SETTLEMENTS_BETWEEN_USERS } from '@iou/core';
import { store } from 'src/state';
import { AnyAction } from 'redux';

export const GET_SETTLEMENTS = 'IOU/GET_SETTLEMENTS';
export const GETTING_SETTLEMENTS = 'IOU/GETTING_SETTLEMENTS';

export function getSettlementsToUser(toUserId: string): AnyAction {
  store.dispatch({
    type: GETTING_SETTLEMENTS
  });

  const payload: Promise<Settlement> = new Promise<Settlement>((resolve, reject) => {
    Parse.Cloud.run(CLOUD_FUNCTION_GET_SETTLEMENTS_BETWEEN_USERS, {
      toUserId: toUserId
    }).then(result => {
      resolve(result);
    });
  });

  return {
    type: GET_SETTLEMENTS,
    payload: payload
  };
}
