import * as Parse from 'parse';
import { Action } from 'redux';
import { Settlement } from '@iou/core';
import { store } from '@shared/state';

export const GET_SETTLEMENTS = 'IOU/GET_SETTLEMENTS';
export const GETTING_SETTLEMENTS = 'IOU/GETTING_SETTLEMENTS';

export function getSettlementOverviews(currentUserId: number): Action {
  store.dispatch({
    type: GETTING_SETTLEMENTS
  });

  const payload: Promise<Settlement> = new Promise<Settlement>((resolve, reject) => {
    Parse.Cloud.run('getSettlements', {
      id: currentUserId
    }).then(result => {
      resolve(result);
    });
  });

  return {
    type: GET_SETTLEMENTS,
    payload: payload
  } as Action;
}
