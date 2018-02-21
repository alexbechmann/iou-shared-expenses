export class FriendRequest extends Parse.Object {
  constructor() {
    super("FriendRequest");
  }
  
  get fromUser(): Parse.Pointer  {
    return this.get('fromUser');
  }
  set fromUser(value: Parse.Pointer ) {
   this.set('fromUser', value);
  }
  
  get toUser(): Parse.Pointer  {
    return this.get('toUser');
  }
  set toUser(value: Parse.Pointer ) {
   this.set('toUser', value);
  }
}
