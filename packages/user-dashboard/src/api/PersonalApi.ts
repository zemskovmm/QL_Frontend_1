import { jsonToUrlParam, request } from "./QLBaseApi";

export type ApplicationsPropsReq = {
    page: number;
    pageSize: number;
    type: string;
    status: string;
};

export type ApplicationsPage = {
    id: number,
    type: string,
    entityId: number,
    status: string,
    commonApplicationInfo: any,
    entityTypeSpecificApplicationInfo: any,
};

export type ApplicationsRes = {
    totalPages: number;
    totalItems: number;
    items: Array<ApplicationsPage>;
};

export type MessagesType = {
    author: string,
    blobId: number|null,
    date: string,
    type: string,
    text: string,
};

export type SendMessageType = {
    type: number,
    text: string,
}

export class PersonalApi {
    getApplications = async ( data:ApplicationsPropsReq ) => 
        request<ApplicationsRes>(jsonToUrlParam("personal/applications",data), null, "GET");
    getMessages = async ( id:number ) => 
        request<Array<MessagesType>>(`personal/applications/${id}/chat/messages`, null, "GET");
    sendMessages = async ( id:number, data: SendMessageType) => 
        request(`personal/applications/${id}/chat/messages`, data, "POST");
}

export const personalApi = new PersonalApi();