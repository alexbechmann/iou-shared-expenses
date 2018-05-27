// import * as Parse from 'parse';

export class FriendRequest extends Parse.Object {
  constructor() {
    super('FriendRequest');
  }

  getFromUserPointer(): Parse.Pointer {
    return this.get('fromUser');
  }
  setFromUserPointer(value: Parse.Pointer) {
    this.set('fromUser', value);
  }

  getFromUser(): Parse.User {
    return this.get('fromUser');
  }

  getToUserPointer(): Parse.Pointer {
    return this.get('toUser');
  }
  setToUserPointer(value: Parse.Pointer) {
    this.set('toUser', value);
  }

  getToUser(): Parse.User {
    return this.get('toUser');
  }
}
