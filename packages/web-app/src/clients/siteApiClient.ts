import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { ClientRouteDto } from "src/interfaces/clientRouteDto";
import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";
import { useData } from "@project/components/src/utils/dataEffect";

export interface CatalogFilterRequestDto {
  identifier: string;
  values: number[];
}

export class SiteApiClient extends ApiClientBase {
  async route(lang: string, elements: string[]): Promise<ClientRouteDto> {
    const url = "route/" + lang + "/" + elements.join("/");
    return this.sendRequest<ClientRouteDto>(url);
  }

  async sendCallback(req: any) {
    const url = `call/request`;
    const res = await this.sendRequest(url, req);
    return res;
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
}

export const siteApi = new SiteApiClient();
