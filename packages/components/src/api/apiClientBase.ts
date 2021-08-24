import { hasOwnProperty } from "web-app/src/utilities/utils";

const removeLastSlash = (url: string) => url.replace(/\/+$/, "");

export const ApiBaseUrl = removeLastSlash(
  process.env["REACT_APP_API_BASE_URL"] || process.env["NEXT_PUBLIC_API_BASE_URL"] || ""
);

export const SsrCompatibleApiBaseUrl = removeLastSlash(process.env["API_BASE_URL"] || ApiBaseUrl);

export class ApiClientBase {
  async sendRequest<T>(path: string, data?: any, method?: string, formData?: boolean) {
    const headers = new Headers();
    if (data != null && !formData) {
      headers.append("Content-Type", "application/json");
    }
    const init: RequestInit = {
      method: method || (data == null ? "GET" : "POST"),
      headers: headers,
      body: data == null ? undefined : formData ? data : JSON.stringify(data),
    };
    const url = SsrCompatibleApiBaseUrl + "/api/" + path;
    const res = await fetch(url, init);

    if (res.ok) {
      const resText = await res.text();

      if (resText.length) {
        return <T>JSON.parse(resText);
      } else {
        const kostylAnswer: unknown = true;
        return <T>kostylAnswer;
      }
    }
    const errorText = await res.text();
    console.error(`Network error for request ${init.method} ${url}\n${init.body}\nError: ${res.status} ${errorText}`);
    throw new Error(`Network error: ${res.status} ${errorText}`);
  }
}
