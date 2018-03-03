import { SettlementService } from '../settlement.service';
import { SettlementOverview } from '@iou/core';

export async function getSettlements(req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) {
  const currentUser: Parse.User = req.user;
  const settlementService = new SettlementService();
  const settlements: SettlementOverview[] = await settlementService.getSettlementOverviewForUser(currentUser);

  res.success(settlements);
}
