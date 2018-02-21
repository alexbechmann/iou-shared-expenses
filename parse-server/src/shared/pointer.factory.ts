export function createUserPointer(objectId: string) : Parse.Pointer {
  return  {
    __type: "Pointer",
    className: "_User",
    objectId: objectId
  }
}
