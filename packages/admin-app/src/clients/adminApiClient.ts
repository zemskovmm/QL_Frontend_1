import { AdminPageDto, AdminPageListDto, IdResponseDto } from "src/interfaces/AdminPageDto";
import { encodeQueryString } from "src/utils/urlUtil";
import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { AdminTraitListItemDto, AdminTraitItemDto, AdminTraitTypeDto } from "../interfaces/TraitPageDto";
import { AdminUniversityItemDto, AdminUniversityItemPostDto } from "../interfaces/UniversityPageDto";
import { AdminSchoolDto } from "../stores/pages/school/schoolPageStore";
import { RemoteUiDefinition } from "@kekekeks/remoteui/src";
import { AdminCourseDto } from "../stores/pages/course/coursePageStore";
import { GlobalSettingsDto } from "src/interfaces/GlobalSettingsDto";
import { ManagerCreateDto } from "../stores/pages/manager/managerCreateStore";
import { AdminHousingDto } from "../stores/pages/housing/housing-page-store";

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
  getGlobalSettings = (lang: string) => this.sendRequest<GlobalSettingsDto>(`global/ql/${lang}`);
  putGlobalSettings = (lang: string, data: any) =>
    this.sendRequest<GlobalSettingsDto>(`admin/global/ql/${lang}`, data, "PUT");
  postLogin = (data: { username: string; password: string; rememberMe: boolean }) =>
    this.sendRequest("admin/auth/login", data, "POST");
  getCheck = () => this.sendRequest("admin/auth/check");
  getLogout = () => this.sendRequest("admin/auth/logout");

  /* Trait */
  getTraitTypeList = () => this.sendRequest<AdminTraitTypeDto[]>("admin/trait-types");
  getTraitsListOfType = (id: number) => this.sendRequest<AdminTraitTypeDto[]>(`admin/traits/of-type/${id}`);
  getActiveTraitsByCourseId = (id: number) => this.sendRequest<number[]>(`admin/entity-traits-course/${id}`);
  getActiveTraitsBySchoolId = (id: number) => this.sendRequest<number[]>(`admin/entity-traits-school/${id}`);
  getActiveUniversityTraits = (id: number) => this.sendRequest<number[]>(`admin/entity-traits-university/${id}`);
  getActiveHousingTraits = (id: number) => this.sendRequest<number[]>(`admin/entity-traits-housing/${id}`);
  getActiveHousingAccommodationTraits = (id: number) =>
    this.sendRequest<number[]>(`admin/entity-traits-housing-accommodation-type/${id}`);
  getActivePageTraits = (id: number) => this.sendRequest<number[]>(`admin/entity-traits-page/${id}`);

  /* Trait adders */
  addTraitToCourse = (id: number, traitId: number) =>
    this.sendRequest<void>(`admin/entity-traits-course/${id}/${traitId}`, "", "POST");

  removeTraitFromCourse = (id: number, traitId: number) =>
    this.sendRequest<void>(`admin/entity-traits-course/${id}/${traitId}`, "", "DELETE");

  addTraitToSchool = (id: number, traitId: number) =>
    this.sendRequest<void>(`admin/entity-traits-school/${id}/${traitId}`, "", "POST");

  removeTraitFromSchool = (id: number, traitId: number) =>
    this.sendRequest<void>(`admin/entity-traits-school/${id}/${traitId}`, "", "DELETE");

  addTraitToUniversity = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-university/${id}/${traitId}`, "", "POST");

  removeTraitFromUniversity = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-university/${id}/${traitId}`, "", "DELETE");

  addTraitToPage = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-page/${id}/${traitId}`, "", "POST");

  removeTraitFromPage = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-page/${id}/${traitId}`, "", "DELETE");

  addTraitToHousing = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-housing/${id}/${traitId}`, "", "POST");

  removeTraitFromHousing = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-housing/${id}/${traitId}`, "", "DELETE");

  addTraitToHousingAccommodation = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-housing-accommodation-type/${id}/${traitId}`, "", "POST");

  removeTraitFromHousingAccommodation = (id: number, traitId: number) =>
    this.sendRequest(`admin/entity-traits-housing-accommodation-type/${id}/${traitId}`, "", "DELETE");

  // TODO remove this!
  getTraitList = () => this.sendRequest<AdminTraitListItemDto[]>("admin/trait-types");
  getTrait = (id: string) => this.sendRequest<AdminTraitListItemDto[]>("admin/traits/of-type/" + id);
  // REMOVE END

  createTrait = (typeId: number, data: AdminTraitItemDto) =>
    this.sendRequest(`admin/traits/of-type/${typeId}`, data, "POST");
  createTraitType = (data: AdminTraitTypeDto) => this.sendRequest(`admin/trait-types`, data, "POST");
  updateTraitType = (typeId: number, data: AdminTraitTypeDto) =>
    this.sendRequest(`admin/trait-types/${typeId}`, data, "PUT");
  getTraitType = (typeId: number) => this.sendRequest<AdminTraitTypeDto>(`admin/trait-types/${typeId}`);
  definitionTrait = () => this.sendRequest<RemoteUiDefinition>("admin/trait/definition");
  definitionTraitType = () => this.sendRequest<RemoteUiDefinition>("admin/trait-type/definition");
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

  /* School */
  getSchoolList = () => this.sendRequest<AdminSchoolDto<unknown>[]>("admin/schools");
  getSchool = (id: number) =>
    this.sendRequest<{ value: AdminSchoolDto<unknown>; definition: RemoteUiDefinition }>(`admin/schools/${id}`);
  updateSchool = (id: number, data: AdminSchoolDto<unknown>) => this.sendRequest(`admin/schools/${id}`, data, "PUT");
  createSchool = (data: AdminSchoolDto<unknown>) => this.sendRequest(`admin/schools/`, data, "POST");
  definitionSchool = () => this.sendRequest<RemoteUiDefinition>("admin/schools/definition");

  /* Course */
  getCourseList = () => this.sendRequest<AdminCourseDto<unknown>[]>("admin/courses");
  getCourse = (id: number) => this.sendRequest<AdminCourseDto<unknown>>(`admin/courses/${id}`);
  updateCourse = (id: number, data: AdminCourseDto<unknown>) => this.sendRequest(`admin/courses/${id}`, data, "PUT");
  createCourse = (data: AdminCourseDto<unknown>) => this.sendRequest(`admin/courses/`, data, "POST");
  definitionCourses = () => this.sendRequest<RemoteUiDefinition>("admin/courses/definition");

  /* Housing */
  getHousingList = () => this.sendRequest<AdminHousingDto<unknown>[]>("admin/housings");
  getHousing = (id: number) =>
    this.sendRequest<{ value: AdminHousingDto<unknown>; definition: RemoteUiDefinition }>(`admin/housings/${id}`);
  updateHousing = (id: number, data: AdminHousingDto<unknown>) => this.sendRequest(`admin/housings/${id}`, data, "PUT");
  createHousing = (data: AdminHousingDto<unknown>) => this.sendRequest(`admin/housings/`, data, "POST");
  definitionHousings = () => this.sendRequest<RemoteUiDefinition>("admin/housings/definition");

  /* Manager */
  postManagerCreate = (data: ManagerCreateDto) => this.sendRequest(`admin/auth/manager/register`, data, "POST");

  /* Manager cabinet */
  getManagerApplication = (data: any) => this.sendRequest(`admin/personal/applications` + encodeQueryString(data));
}

export const AdminApi = new AdminApiClient();
