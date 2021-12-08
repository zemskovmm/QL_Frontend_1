const removeLastSlash = (url: string) => url.replace(/\/+$/, "");

export const ApiBaseUrl = removeLastSlash(
  process.env["REACT_APP_API_BASE_URL"] ||
    process.env["NEXT_PUBLIC_API_BASE_URL"] ||
    process.env["DASHBOARD_PUBLIC_API_BASE_URL"] ||
    ""
);

export const SsrCompatibleApiBaseUrl = removeLastSlash(process.env["API_BASE_URL"] || ApiBaseUrl);

export class QLRequest<T> {
  readonly isOk: boolean;
  readonly status: number;
  readonly url: string;
  readonly requestMethod: string;
  readonly requestBody: any;
  readonly body?: T;
  readonly error: string;

  constructor(
    isOk: boolean,
    status: number,
    url: string,
    requestMethod: string = "",
    requestBody: any,
    body?: T,
    error: string = ""
  ) {
    this.isOk = isOk;
    this.status = status;
    this.url = url;
    this.requestMethod = requestMethod;
    this.requestBody = requestBody;
    this.body = body;
    this.error = error;
  }
}

export class ApiClientBase {
  async request<T>(
    path: string,
    data?: any,
    method?: string,
    formData?: boolean,
    customForm?: boolean
  ): Promise<QLRequest<T>> {
    const headers = new Headers();
    if (data != null && !formData) {
      headers.append("Content-Type", "application/json");
      headers.append("Content-Type", "multipart/form-data");
    }
    const init: RequestInit = {
      method: method || (data == null || path === "global" ? "GET" : "POST"),
      headers: headers,
      body: data == null || path === "global" ? undefined : formData || customForm ? data : JSON.stringify(data),
      credentials: "include",
    };

    const url =
      path === "global" ? `${SsrCompatibleApiBaseUrl}/api/global/ql/${data}` : SsrCompatibleApiBaseUrl + "/api/" + path;

    try {
      const res = await fetch(encodeURI(url), init);
      const resText = await res.text();

      if (res.ok) {
        if (resText.length) {
          return new QLRequest<T>(true, res.status, url, init.method, init.body, <T>JSON.parse(resText));
        } else {
          return new QLRequest<T>(true, res.status, url, init.method, init.body);
        }
      }
      return new QLRequest<T>(
        false,
        res.status,
        url,
        init.method,
        init.body,
        undefined,
        `Network error: ${res.status} ${resText}`
      );
    } catch (e) {
      return new QLRequest<T>(false, 0, url, init.method, init.body, undefined, String(e));
    }
  }

  async sendRequest<T>(path: string, data?: any, method?: string, formData?: boolean): Promise<T> {
    const { isOk, body, requestMethod, requestBody, url, status, error } = await this.request<T>(
      path,
      data,
      method,
      formData
    );

    if (isOk) {
      const kostylAnswer: unknown = true;
      return body ? body : <T>kostylAnswer;
    }

    console.error("Network error for request", requestMethod, url, "\n", requestBody, "\n", "Error: ", error);
    if (status) {
      throw new Error(error);
    }
    throw new Error(error);
  }
}
