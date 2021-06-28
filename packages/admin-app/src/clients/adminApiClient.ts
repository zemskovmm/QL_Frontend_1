import { AdminPageDto, AdminPageListDto, IdResponseDto } from "src/interfaces/AdminPageDto";
import { encodeQueryString } from "src/utils/urlUtil";
import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { AdminTraitListItemDto, AdminTraitItemDto } from "../interfaces/TraitPageDto";

export class AdminApiClient extends ApiClientBase {
  getTotalPages = (length: number) => (length % 10 ? Math.floor(length / 10) + 1 : Math.floor(length / 10));
  getPages = (page: number, search?: string) =>
    this.sendRequest<AdminPageListDto>(
      "admin/pages" +
        encodeQueryString({
          page: page.toString(),
          search: search,
        })
    );

  getPageById = (page: number) => this.sendRequest<AdminPageDto>("admin/pages/" + page);
  updatePage = (page: number, data: AdminPageDto) =>
    this.sendRequest<IdResponseDto>("admin/pages/" + page, data, "PUT");
  createPage = (data: AdminPageDto) => this.sendRequest<IdResponseDto>("admin/pages", data);

  /* Trait */

  getTraitList = () => this.sendRequest<AdminTraitListItemDto[]>("admin/trait-types");
  getTrait = (id: string) => this.sendRequest<AdminTraitListItemDto[]>("admin/traits/of-type/" + id);
  getTraitItem = (id: string) => this.sendRequest<AdminTraitItemDto>("admin/traits/" + id);
  putTraitItem = (id: string, data: any) => this.sendRequest<AdminTraitItemDto>("admin/traits/" + id, data, "PUT");
}

export const AdminApi = new AdminApiClient();
