import { ApiClientBase } from "@project/components/src/api/apiClientBase";


export type QlClientLoginProps = {
  email: string;
  password: string;
};

export type QlClientRegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export class QlClient extends ApiClientBase {
  login = async (props: QlClientLoginProps) => this.sendRequest("/api/portal/login", props, "POST");
  register = async (props: QlClientRegisterProps) => this.sendRequest("portal​/register", props, "POST");
}



export const qlClient = new QlClient();
