export function buildQueryString(data: {[key: string]: string}) : string
{
  var esc = encodeURIComponent;
  var query = Object.keys(data)
    .map(k => esc(k) + '=' + esc(data[k]))
    .join('&');
  return query;
}
