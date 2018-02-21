import { User } from "parse";
import { FriendRequest } from "@iou/core";

export interface SocialState {
  searchText: string;
  searchResults: User[];
  loading: boolean;
  sendingFriendRequests: string[];
  acceptingFriendRequests: string[];
  friendRequests: FriendRequest[];
  gettingFriendRequests: boolean;
}
