import { SettlementService } from '../settlement.service';
import { Settlement } from '@iou/core';
import { UserService } from 'users/user.service';

export async function getSettlementsBetweenUsers(req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) {
  const params: { toUserId: string } = req.params;
  const settlementService = new SettlementService();
  const settlements: Settlement[] = await settlementService.getSettlementsBetween(req.user.id, params.toUserId);
  res.success(settlements);
}
