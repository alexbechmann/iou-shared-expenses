"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const social_service_1 = require("./social/social.service");
const pointer_factory_1 = require("./shared/pointer.factory");
const settlement_service_1 = require("./settlements/settlement.service");
const user_service_1 = require("./users/user.service");
Parse.Cloud.define("sendFriendRequest", (req, res) => {
    const params = req.params;
    const currentUser = req.user;
    const socialService = new social_service_1.SocialService();
    socialService.insertFriendRequestIfNeeded(currentUser.id, params.toUserId).then(() => {
        res.success({});
    }, err => {
        res.error(err);
    });
});
Parse.Cloud.define("acceptFriendRequest", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const params = req.params;
    const currentUser = req.user;
    const socialService = new social_service_1.SocialService();
    const userService = new user_service_1.UserService();
    const fromUser = yield userService.userForId(currentUser.id);
    const toUser = yield userService.userForId(params.toUserId);
    fromUser.relation('friends').add(toUser);
    toUser.relation('friends').add(fromUser);
    yield Parse.Object.saveAll([fromUser, toUser], { useMasterKey: true });
    var requests1 = yield socialService.friendRequestsBetween(pointer_factory_1.createUserPointer(currentUser.id), pointer_factory_1.createUserPointer(params.toUserId));
    var requests2 = yield socialService.friendRequestsBetween(pointer_factory_1.createUserPointer(params.toUserId), pointer_factory_1.createUserPointer(currentUser.id));
    const requests = Array.prototype.concat(requests1, requests2);
    for (let request of requests) {
        yield request.destroy();
    }
    return res.success({});
}));
Parse.Cloud.define("getSettlements", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const currentUser = req.user;
    const settlementService = new settlement_service_1.SettlementService();
    const settlements = yield settlementService.getSettlementOverviewForUser(currentUser);
    res.success(settlements);
}));
