import { ApiClientBase } from "@project/components/src/api/apiClientBase";

export type QlClientLoginProps = {
  email: string;
  password: string;
};

export type QlClientRegisterProps = {
  email: string;
  password: string;
};

export class QlClient extends ApiClientBase {
  login = async (props: QlClientLoginProps) => this.request("portal/login", props, "POST");
  register = async (props: QlClientRegisterProps) => this.request("portal/register", props, "POST");
  heartbeat = async () => this.request("portal/heartbeat", null, "POST");
  logout = async () => this.request("portal/logout", null, "GET");
}


export const qlClient = new QlClient();
