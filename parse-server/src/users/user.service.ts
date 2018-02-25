import { User } from 'parse';

export class UserService {
  async userForId(id: string): Promise<User> {
    return await new Parse.Query(User).get(id);
  }
}
