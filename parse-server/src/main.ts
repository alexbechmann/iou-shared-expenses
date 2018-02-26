import { SocialService } from './social/social.service';
import { createUserPointer } from './shared/pointer.factory';
import { SettlementService } from './settlements/settlement.service';
import { SettlementOverview } from '@iou/core';
import { UserService } from './users/user.service';
import { User } from 'parse';
import { FriendRequest } from './shared/schema';
import { sendFriendRequest, acceptFriendRequest } from './social/controllers/social.controller';
import { getSettlements } from 'settlements/controllers/settlement.controller';

Parse.Cloud.define('sendFriendRequest', sendFriendRequest);
Parse.Cloud.define('acceptFriendRequest', acceptFriendRequest);
Parse.Cloud.define('getSettlements', getSettlements);
