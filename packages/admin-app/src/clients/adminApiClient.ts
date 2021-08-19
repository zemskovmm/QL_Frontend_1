import { AdminPageDto, AdminPageListDto, IdResponseDto } from "src/interfaces/AdminPageDto";
import { encodeQueryString } from "src/utils/urlUtil";
import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { AdminTraitListItemDto, AdminTraitItemDto } from "../interfaces/TraitPageDto";
import { AdminUniversityItemDto, AdminUniversityItemPostDto } from "../interfaces/UniversityPageDto";

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
  putTraitItem = (id: string, data: AdminTraitItemDto) =>
    this.sendRequest<AdminTraitItemDto>("admin/traits/" + id, data, "PUT");
  getTraitAvailable = (type: string) => this.sendRequest<number[]>("/admin/entity-trait-types/" + type);

  /* University */

  getUniversityList = () => this.sendRequest<AdminUniversityItemDto[]>("admin/universities");
  getUniversity = (id: string) => this.sendRequest<AdminUniversityItemDto>("admin/universities/" + id);
  postUniversity = (data: AdminUniversityItemPostDto) =>
    this.sendRequest<AdminUniversityItemPostDto>("admin/universities", data);
  putUniversity = (id: string, data: AdminUniversityItemPostDto) =>
    this.sendRequest<AdminUniversityItemPostDto>("admin/universities/" + id, data, "PUT");
  getUniversityTraitHave = (id: string) => this.sendRequest<number[]>("/admin/entity-traits-university/" + id);
  postUniversityTrait = (id: string, traitId: string) =>
    this.sendRequest(`/admin/entity-traits-university/${id}/${traitId}`, "", "POST");
  deleteUniversityTrait = (id: string, traitId: string) =>
    this.sendRequest(`/admin/entity-traits-university/${id}/${traitId}`, "", "DELETE");
}

export const AdminApi = new AdminApiClient();
