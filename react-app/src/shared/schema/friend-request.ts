import * as Parse from 'parse';

export class FriendRequest extends Parse.Object {
  constructor() {
    super("FriendRequest");
  }

  get fromUser(): Parse.User  {
    return this.get('fromUser');
  }
  set fromUser(value: Parse.User ) {
   this.set('fromUser', value);
  }

  get toUser(): Parse.Pointer  {
    return this.get('toUser');
  }
  set toUser(value: Parse.Pointer ) {
   this.set('toUser', value);
  }
}
