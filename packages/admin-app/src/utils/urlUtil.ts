export const encodeQueryString = (data: { [name: string]: string | null | undefined }): string => {
  var str = [];
  for (var p in data)
    if (data.hasOwnProperty(p)) {
      const v = data[p]
      if (v != null)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(v));
    }
  if (str.length == 0)
    return "";
  return "?" + str.join("&");
}
