import { SocialService } from './social/social.service';
import { createUserPointer } from "./shared/pointer.factory";
import { SettlementService } from "./settlements/settlement.service";
import { SettlementOverview } from "@iou/core";
import { UserService } from "./users/user.service";
import { User } from "parse";
import { FriendRequest } from "./shared/schema";

Parse.Cloud.define("sendFriendRequest", (req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) => {
  const params: {
    toUserId: string
  } = req.params;
  const currentUser: Parse.User = req.user;
  const socialService = new SocialService();

  socialService.insertFriendRequestIfNeeded(currentUser.id, params.toUserId).then(() => {
    res.success({})
  }, err => {
    res.error(err);
  })
});

Parse.Cloud.define("acceptFriendRequest", async (req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) => {
  const params: {
    toUserId: string
  } = req.params;
  const currentUser: Parse.User = req.user;
  const socialService = new SocialService();
  const userService = new UserService();
  const fromUser: User = await userService.userForId(currentUser.id);
  const toUser: User = await userService.userForId(params.toUserId);

  fromUser.relation('friends').add(toUser);
  toUser.relation('friends').add(fromUser);

  await Parse.Object.saveAll([fromUser, toUser], { useMasterKey: true })

  var requests1 = await socialService.friendRequestsBetween(createUserPointer(currentUser.id), createUserPointer(params.toUserId));
  var requests2 = await socialService.friendRequestsBetween(createUserPointer(params.toUserId), createUserPointer(currentUser.id));
  const requests: FriendRequest[] = Array.prototype.concat(requests1, requests2);

  for (let request of requests) {
    await request.destroy();
  }

  return res.success({});
});

Parse.Cloud.define("getSettlements", async (req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) => {
  const currentUser: Parse.User = req.user;
  const settlementService = new SettlementService();
  const settlements: SettlementOverview[] = await settlementService.getSettlementOverviewForUser(currentUser);

  res.success(settlements);
});
