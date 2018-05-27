import { FriendRequest } from '@iou/core';
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
