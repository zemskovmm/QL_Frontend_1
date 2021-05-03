import {AdminPageDto, AdminPageListDto, IdResponseDto} from "src/interfaces/PageDto";
import {encodeQueryString} from "src/utils/urlUtil";
import {ApiClientBase} from "@project/components/src/api/apiClientBase";

export class AdminApiClient extends ApiClientBase {
  getPages = (page: number, search?: string) => this.sendRequest<AdminPageListDto>("admin/pages"
    + encodeQueryString({
      "page": page.toString(),
      "search": search
    }));

  getPageById = (page: number) => this.sendRequest<AdminPageDto>("admin/pages/" + page);
  updatePage = (page: number, data: AdminPageDto) => this.sendRequest<IdResponseDto>("admin/pages/" + page, data, "PUT");
  createPage = (data: AdminPageDto) => this.sendRequest<IdResponseDto>("admin/pages", data);
}

export const AdminApi = new AdminApiClient();
