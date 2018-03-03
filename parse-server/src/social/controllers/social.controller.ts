import { SocialService } from '../social.service';
import { UserService } from '../../users/user.service';
import { User } from 'parse';
import { FriendRequest } from '../../shared/schema';
import { createUserPointer } from '../../shared/pointer.factory';

export function sendFriendRequest(req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) {
  const params: { toUserId: string } = req.params;
  const socialService = new SocialService();

  socialService.insertFriendRequestIfNeeded(req.user.id, params.toUserId).then(
    () => {
      res.success({});
    },
    err => {
      res.error(err);
    }
  );
}

export async function acceptFriendRequest(req: Parse.Cloud.FunctionRequest, res: Parse.Cloud.FunctionResponse) {
  const params: { toUserId: string } = req.params;
  const currentUser: Parse.User = req.user;
  const socialService = new SocialService();
  const userService = new UserService();
  const fromUser: User = await userService.userForId(currentUser.id);
  const toUser: User = await userService.userForId(params.toUserId);

  fromUser.relation('friends').add(toUser);
  toUser.relation('friends').add(fromUser);

  await Parse.Object.saveAll([fromUser, toUser], { useMasterKey: true });

  var requests1 = await socialService.friendRequestsBetween(
    createUserPointer(currentUser.id),
    createUserPointer(params.toUserId)
  );
  var requests2 = await socialService.friendRequestsBetween(
    createUserPointer(params.toUserId),
    createUserPointer(currentUser.id)
  );
  const requests: FriendRequest[] = Array.prototype.concat(requests1, requests2);

  for (let request of requests) {
    await request.destroy();
  }

  return res.success({});
}
