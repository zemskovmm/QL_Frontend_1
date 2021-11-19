import { jsonToUrlParam, request } from "./QLBaseApi";
import { 
  ApplicationsPagesDto, 
  ApplicationDto, 
  ApplicationsMessageDto, 
  ApplicationsSendMessageProps,
  ApplicationPostProps
} from "@project/components/src/interfaces/ApplicationDto";


export type ApplicationsPropsReq = {
  page: number;
  pageSize: number;
  type: string;
  status: string;
};

export type IdReq = {
  id: number;
};

export type GetMessagesPropsReq = {
  beforeMessageId?:number;
  afterMessageId?:number;
  count?:number
};





export class PersonalApi {
  addApplications = async (data: ApplicationDto) => request<IdReq>("personal/applications", data, "POST");

  getApplications = async (data: ApplicationsPropsReq) =>
    request<ApplicationsPagesDto>(jsonToUrlParam("personal/applications", data), null, "GET");

  getMessages = async (id: number,data:GetMessagesPropsReq) =>
    request<Array<ApplicationsMessageDto>>(jsonToUrlParam(`personal/applications/${id}/chat/messages`,data), null, "GET");

  sendMessages = async (id: number, data: ApplicationsSendMessageProps) =>
    request(`personal/applications/${id}/chat/messages`, data, "POST");

  getApplicationItem = async (id: number) => request(`personal/applications/${id}`, null, "GET");

  postApplicationItem = async (id: number, data: ApplicationPostProps) =>
    request(`personal/applications/${id}`, data, "POST");
}

export const personalApi = new PersonalApi();
