import { IdReq, jsonToUrlParam, request } from "./QLBaseApi";
import {
  ApplicationsPagesDto,
  ApplicationDto,
  ApplicationsMessageDto,
  ApplicationsSendMessageProps,
  ApplicationPostProps,
} from "@project/components/src/interfaces/ApplicationDto";

export type ApplicationsPropsReq = {
  page: number;
  pageSize: number;
  type: string;
  status: string;
};

export type GetMessagesPropsReq = {
  beforeMessageId?: number;
  afterMessageId?: number;
  count?: number;
};

export class ApplicationsApi {
  addApplications = async (data: ApplicationDto) => request<IdReq>("personal/applications", data, "POST");

  getApplications = async (data: ApplicationsPropsReq) =>
    request<ApplicationsPagesDto>(jsonToUrlParam("personal/applications", data), null, "GET");

  getMessages = async (id: number, data: GetMessagesPropsReq) =>
    request<Array<ApplicationsMessageDto>>(
      jsonToUrlParam(`personal/applications/${id}/chat/messages`, data),
      null,
      "GET"
    );

  sendMessages = async (id: number, data: ApplicationsSendMessageProps) =>
    request(`personal/applications/${id}/chat/messages`, data, "POST");

  uploadMessageFile = async (id: number, data: FormData) =>
    request<IdReq>(`personal/applications/${id}/chat/messages/upload`, data, "POST", true);

  getApplicationItem = async (id: number) => request(`personal/applications/${id}`, null, "GET");

  postApplicationItem = async (id: number, data: ApplicationPostProps) =>
    request(`personal/applications/${id}`, data, "POST");

  postMedia = async (applicationId: number, data: FormData) =>
    request<IdReq>(`application/files/${applicationId}`, data, "POST", true);

  deleteMedia = async (applicationId: number, blobId: number) =>
    request<IdReq>(`application/files/${applicationId}/${blobId}`, null, "DELETE");
}

export const applicationsApi = new ApplicationsApi();
