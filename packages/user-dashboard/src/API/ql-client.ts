import { ApiClientBase } from "@project/components/src/api/apiClientBase";

export type QlClientLoginProps = {
  email: string;
  password: string;
};

export class QlClient extends ApiClientBase {
  login = async (props: QlClientLoginProps) => this.sendRequest("/api/portal/login", props, "POST");
}

export const qlClient = new QlClient();
