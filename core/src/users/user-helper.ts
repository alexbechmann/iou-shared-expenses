import { UserProperties } from './user-properties';
import { nameof } from '../shared/nameof';

export class UserHelper {
  getUserProperties(user: Parse.User): UserProperties {
    const displayName = user.get(nameof<UserProperties>('displayName')) || user.getUsername() || user.id;
    return {
      displayName,
      facebookId: user.get(nameof<UserProperties>('facebookId')),
      initials: displayName
        .split(' ')
        .slice(0, 2)
        .map((word: any) => word[0])
        .join('')
        .toUpperCase()
    };
  }
}
