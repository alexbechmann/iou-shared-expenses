import { Settlement } from '@iou/core';

export interface SettlementsState {
  gettingSettlements: boolean;
  allSettlements: Settlement[];
}
