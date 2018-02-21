import { SettlementOverview } from "@iou/core";

export interface SettlementsState {
  gettingSettlements: boolean;
  overviews: SettlementOverview[];
}
