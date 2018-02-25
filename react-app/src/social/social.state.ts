import { User } from 'parse';
import { FriendRequest } from '@shared/schema';

export interface SocialState {
  searchText: string;
  searchResults: User[];
  loading: boolean;
  sendingFriendRequests: string[];
  acceptingFriendRequests: string[];
  friendRequests: FriendRequest[];
  gettingFriendRequests: boolean;
}
