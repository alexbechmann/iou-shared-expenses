import { UserProperties } from "./user-properties";
import { nameof } from '../shared/nameof';

export class UserHelper {
  getUserProperties(user: Parse.User): UserProperties {
    return {
      displayName: user.get(nameof<UserProperties>('displayName')) || user.getUsername(),
      facebookId: user.get(nameof<UserProperties>('facebookId'))
    }
  }
}