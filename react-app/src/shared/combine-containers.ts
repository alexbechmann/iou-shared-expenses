export function combineContainers(o: any, callbacks: ((c: any) => any)[]): any {
  var c = o;
  callbacks.forEach(callback => {
    c = callback(c);
  });
  return c;
}
