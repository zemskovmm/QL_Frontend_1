import {hasOwnProperty} from "web-app/src/utilities/utils";

export const ApiBaseUrl = (
  process.env["API_BASE_URL"]
  || process.env["REACT_APP_API_BASE_URL"]
  || process.env["NEXT_PUBLIC_API_BASE_URL"]
  || "").replace(
  /\/+$/,
  ""
);

export class ApiClientBase {
  async sendRequest<T>(path: string, data?: any, method?: string, formData?: boolean) {
    const headers = new Headers();
    if (data != null && !formData) {
        headers.append("Content-Type", "application/json");
    }
    const init: RequestInit = {
      method: method || (data == null ? "GET" : "POST"),
      headers: headers,
      body: data == null
        ? undefined
        : formData
          ? data
          : JSON.stringify(data),
    };

    const res = await fetch(ApiBaseUrl + "/api/" + path, init);

    if (res.ok) {
      const resText = await res.text()

      if (resText.length) {
        return <T>JSON.parse(resText)
      } else {
        const kostylAnswer:unknown = true
        return <T>kostylAnswer
      }
    }
    console.log(await res.text());
    throw new Error("Network error");
  }
}
