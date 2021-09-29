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
  login = async (props: QlClientLoginProps) => this.sendRequest("portal/login", props, "POST");
  register = async (props: QlClientRegisterProps) => this.sendRequest("portal/register", props, "POST");
  heartbeat = async () => this.sendRequest("portal/heartbeat", null, "POST");
  logout = async () => this.sendRequest("portal/logout", null, "GET");
}


export const qlClient = new QlClient();
