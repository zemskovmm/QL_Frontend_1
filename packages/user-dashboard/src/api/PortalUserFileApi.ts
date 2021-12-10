import { IdReq, request } from "./QLBaseApi";

export class PortalUserFileApi {
  postUserFile = async (data: FormData) => request<IdReq>("personal/media", data, "POST", true);
  deleteUserFile = async (id: number) => request(`personal/media/${id}`, null, "DELETE");
}

export const portalUserFileApi = new PortalUserFileApi();
