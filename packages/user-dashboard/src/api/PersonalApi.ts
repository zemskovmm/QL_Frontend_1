import { jsonToUrlParam, request } from "./QLBaseApi";
import { ApplicationsPagesDto, ApplicationDto } from "@project/components/src/interfaces/ApplicationDto";
import { ApplicationPostProps } from "routes/MyApplicationsPage/_components/ApplicationTab/ApplicationStore";

export type ApplicationsPropsReq = {
  page: number;
  pageSize: number;
  type: string;
  status: string;
};

export type IdReq = {
  id: number;
};

export type MessagesType = {
  author: string;
  blobId: number | null;
  date: string;
  type: string;
  text: string;
};

export type SendMessageType = {
  type: number;
  text: string;
};

export class PersonalApi {
  addApplications = async (data: ApplicationDto) => request<IdReq>("personal/applications", data, "POST");

  getApplications = async (data: ApplicationsPropsReq) =>
    request<ApplicationsPagesDto>(jsonToUrlParam("personal/applications", data), null, "GET");

  getMessages = async (id: number) =>
    request<Array<MessagesType>>(`personal/applications/${id}/chat/messages?count=100`, null, "GET");

  sendMessages = async (id: number, data: SendMessageType) =>
    request(`personal/applications/${id}/chat/messages`, data, "POST");

  getApplicationItem = async (id: number) => request(`personal/applications/${id}`, null, "GET");

  postApplicationItem = async (id: number, data: ApplicationPostProps) =>
    request(`personal/applications/${id}`, data, "POST");
}

export const personalApi = new PersonalApi();
