import { FriendRequest } from 'src/shared/schema/friend-request';
import { User } from 'parse';

export interface SocialState {
  searchText: string;
  searchResults: User[];
  findingUsers: boolean;
  sendingFriendRequests: string[];
  acceptingFriendRequests: string[];
  friendRequests: FriendRequest[];
  gettingFriendRequests: boolean;
  friends: User[];
  gettingFriends: boolean;
}
