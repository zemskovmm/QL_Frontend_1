import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { ClientRouteDto } from "src/interfaces/clientRouteDto";
import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { useData } from "@project/components/src/utils/dataEffect";
import { ContactUsFormType } from "src/components/common/contactUsForm/contactUsForm";
import { PageListDto } from "src/interfaces/pagesDto";

export interface CatalogFilterRequestDto {
  identifier: string;
  values: number[];
}

export class SiteApiClient extends ApiClientBase {
  async route(lang: string, elements: string[]): Promise<ClientRouteDto> {
    const url = "route/" + lang + "/" + elements.join("/");
    return this.sendRequest<ClientRouteDto>(url);
  }

  async sendCallback(req: ContactUsFormType) {
    const url = `call/request`;
    return await this.sendRequest(url, req);
  }

  async getCatalogFilters(lang: string, entityType: string): Promise<CatalogFilterDto[]> {
    const url = `catalog/${entityType}/filters/${lang}`;
    const res = await this.sendRequest<{ filters: CatalogFilterDto[] }>(url);
    return res.filters;
  }

  useCatalogFilters(lang: string, entityType: string): CatalogFilterDto[] | undefined {
    return useData(
      {
        lang: lang,
        entityType: entityType,
      },
      (req) => this.getCatalogFilters(req.lang, req.entityType)
    );
  }

  async getCatalogItems<T>(
    lang: string,
    entityType: string,
    pageSize: number,
    pageNumber: number,
    filters: CatalogFilterRequestDto[]
  ): Promise<CatalogResponseDto<T>> {
    const url = `catalog/${entityType}/search/${lang}`;
    const req = {
      pageSize: pageSize,
      page: pageNumber,
      filters: filters,
    };
    return this.sendRequest<CatalogResponseDto<T>>(url, req);
  }

  useCatalogItems<T>(
    lang: string,
    entityType: string,
    pageSize: number,
    pageNumber: number,
    filters: CatalogFilterRequestDto[]
  ): CatalogResponseDto<T> | undefined {
    return useData(
      {
        lang: lang,
        entityType: entityType,
        pageSize: pageSize,
        pageNumber: pageNumber,
        filters: filters,
      },
      (req) => this.getCatalogItems(req.lang, req.entityType, req.pageSize, req.pageNumber, req.filters)
    );
  }

  async getBlogPages(page?: number, search?: string, pageType?: string): Promise<PageListDto> {
    let url = `admin/pages?`;
    if (page && page > 1) url += `page=${page}&`;
    if (search) url += `search=${search}&`;
    if (pageType) url += `pageType=${pageType}&`;
    return await this.sendRequest<PageListDto>(url);
  }

  useBlogPages(page?: number, search?: string, pageType?: string): PageListDto | undefined {
    return useData(
      {
        page: page,
        search: search,
        pageType: pageType,
      },
      (req) => this.getBlogPages(req.page, req.search, req.pageType)
    );
  }
}

export const siteApi = new SiteApiClient();
