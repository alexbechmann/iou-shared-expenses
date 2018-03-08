import { SocialService } from './social/social.service';
import { createUserPointer } from './shared/pointer.factory';
import { SettlementService } from './settlements/settlement.service';
import {
  CLOUD_FUNCTION_SEND_FRIEND_REQUEST,
  CLOUD_FUNCTION_ACCEPT_FRIEND_REQUEST,
  CLOUD_FUNCTION_GET_SETTLEMENTS_BETWEEN_USERS,
  CLOUD_FUNCTION_FIND_FRIENDS_WITH_FACEBOOK_IDS
} from '@iou/core';
import { UserService } from './users/user.service';
import { User } from 'parse';
import { FriendRequest } from './shared/schema';
import {
  sendFriendRequest,
  acceptFriendRequest,
  findFriendsWithFacebookIds
} from './social/controllers/social.controller';
import { getSettlementsBetweenUsers } from './settlements/controllers/settlement.controller';

Parse.Cloud.define(CLOUD_FUNCTION_SEND_FRIEND_REQUEST, sendFriendRequest);
Parse.Cloud.define(CLOUD_FUNCTION_ACCEPT_FRIEND_REQUEST, acceptFriendRequest);
Parse.Cloud.define(CLOUD_FUNCTION_GET_SETTLEMENTS_BETWEEN_USERS, getSettlementsBetweenUsers);
Parse.Cloud.define(CLOUD_FUNCTION_FIND_FRIENDS_WITH_FACEBOOK_IDS, findFriendsWithFacebookIds);
