export function buildQueryString(data: { [key: string]: string }): string {
  var esc = encodeURIComponent;
  var query = Object.keys(data)
    .map((k) => esc(k) + "=" + esc(data[k]))
    .join("&");
  return query;
}

export function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
