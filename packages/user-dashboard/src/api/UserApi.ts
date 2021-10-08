import { request } from "./QLBaseApi";

export type QlClientLoginProps = {
  email: string;
  password: string;
};

export type QlClientRegisterProps = {
  email: string;
  password: string;
};

export type QlClientUserProps = {
  firstName: string|null;
  lastName: string|null;
  phone: string|null;
  personalInfo: any|null;
};

export class UserApi {
  login = async (props: QlClientLoginProps) => request("portal/login", props, "POST");
  register = async (props: QlClientRegisterProps) => request("portal/register", props, "POST");
  heartbeat = async () => request("portal/heartbeat", null, "POST");
  logout = async () => request("portal/logout", null, "GET");
  getUser = async () => request<QlClientUserProps>("portal/user", null, "GET");
  putUser = async (props: QlClientUserProps) => request("portal/user", props, "PUT");
}

export const userApi = new UserApi();
