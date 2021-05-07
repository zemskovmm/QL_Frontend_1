export const ApiBaseUrl = (
  process.env["API_BASE_URL"]
  || process.env["REACT_APP_API_BASE_URL"]
  || process.env["NEXT_PUBLIC_API_BASE_URL"]
  || "").replace(
  /\/+$/,
  ""
);

export class ApiClientBase {
  async sendRequest<T>(path: string, data?: any, method?: string) {
    const headers = new Headers();
    if (data != null) {
      headers.append("Content-Type", "application/json");
    }
    const init: RequestInit = {
      method: method || (data == null ? "GET" : "POST"),
      headers: headers,
      body: data == null ? undefined : JSON.stringify(data),
    };

    const res = await fetch(ApiBaseUrl + "/api/" + path, init);
    if (res.ok) return <T>JSON.parse(await res.text());
    throw new Error("Network error");
  }
}
