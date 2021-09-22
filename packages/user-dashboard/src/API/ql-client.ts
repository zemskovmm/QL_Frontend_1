import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { EnzymeAdapter } from "enzyme";

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
  personalInfo: any;
};

export class QlClient extends ApiClientBase {
  login = async (props: QlClientLoginProps) => this.sendRequest("portal/login", props, "POST");
  register = async (props: QlClientRegisterProps) => this.sendRequest("portal/register", props, "POST");
}



export const qlClient = new QlClient();
