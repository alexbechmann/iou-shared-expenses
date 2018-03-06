import { User } from 'parse';
import { nameof, CustomUserProperties } from '@iou/core';

export class UserService {
  async userForId(id: string): Promise<User> {
    return await new Parse.Query(User).get(id);
  }

  async userForFacebookId(facebookId: string): Promise<User> {
    const query = new Parse.Query(User);
    query.equalTo(nameof<CustomUserProperties>('facebookId'), facebookId);
    return await query.first();
  }
}
