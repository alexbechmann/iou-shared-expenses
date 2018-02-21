import { SocialService } from "../social/social.service";
import { User } from "parse";
import { createUserPointer } from "../shared/pointer.factory";
import { Settlement, SettlementOverview} from "@iou/core";
import { Currency } from "@iou/core/lib/currency";

export class SettlementService {
  async getSettlementOverviewForUser(user: User): Promise<SettlementOverview[]> {
    const socialService = new SocialService();
    const friends = await socialService.getFriendsForUser(user);
    const overviews: SettlementOverview[] = [];

    for (let friend of friends) {
      const settlement: SettlementOverview = await this.getOverviewBetween(user, friend);
      overviews.push(settlement);
    }
    
    return overviews;
  }

  async getOverviewBetween(fromUser: User, toUser: User): Promise<SettlementOverview> {
    return {
      user: toUser,
      settlements: await this.getSettlementsBetween(fromUser, toUser)
    }
  }

  async getSettlementsBetween(fromUser: User, toUser: User): Promise<Settlement[]> {
    const query1 = new Parse.Query<any>("Transaction");
    query1.equalTo("fromUser", createUserPointer(fromUser.id));
    query1.equalTo("toUser", createUserPointer(toUser.id));

    const query2 = new Parse.Query<any>("Transaction");
    query2.equalTo("toUser", createUserPointer(fromUser.id));
    query2.equalTo("fromUser", createUserPointer(toUser.id));

    const settlement: Settlement = {
      currency: {
        name: "Pounds",
        id: 0
      },
      amount: 50
    }
    // return await Parse.Query.or(query1, query2).find();
    return Promise.resolve([
      settlement
    ])
  }
}