import { Pointer } from "parse";

export class FriendRequest extends Parse.Object {
  constructor() {
    super("FriendRequest");
  }
  
  get fromUser(): Pointer {
    return this.get('fromUser');
  }
  set fromUser(value: Pointer) {
   this.set('fromUser', value);
  }
  
  get toUser(): Pointer {
    return this.get('toUser');
  }
  set toUser(value: Pointer) {
   this.set('toUser', value);
  }
}
