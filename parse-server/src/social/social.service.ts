import { createUserPointer } from '../shared/pointer.factory';
import { Pointer, User } from 'parse';
import { FriendRequest } from '@iou/core';

export class SocialService {
  async insertFriendRequestIfNeeded(currentUserId: string, toUserId: string): Promise<void> {
    const currentUser: Pointer = createUserPointer(currentUserId);
    const toUser: Pointer = createUserPointer(toUserId);
    var exists = await this.friendRequestExists(currentUser, toUser);
    if (exists === false) {
      var friendRequest = new FriendRequest();
      friendRequest.fromUser = currentUser;
      friendRequest.toUser = toUser;
      await friendRequest.save();
    }
  }

  async friendRequestExists(currentUser: Pointer, toUser: Pointer): Promise<boolean> {
    return (await this.friendRequestsBetweenQuery(currentUser, toUser).count()) > 0;
  }

  async friendRequestsBetween(currentUser: Pointer, toUser: Pointer): Promise<FriendRequest[]> {
    console.log(currentUser, toUser);
    return await this.friendRequestsBetweenQuery(currentUser, toUser).find();
  }

  private friendRequestsBetweenQuery(currentUser: Pointer, toUser: Pointer): Parse.Query<FriendRequest> {
    const query = new Parse.Query(FriendRequest);
    query.equalTo('fromUser', currentUser);
    query.include('fromUser');
    query.include('toUser');
    query.equalTo('toUser', toUser);
    console.log(query);
    return query;
  }

  async getFriendsForUser(user: User): Promise<User[]> {
    return (await user
      .relation('friends')
      .query()
      .find()) as User[];
  }
}
