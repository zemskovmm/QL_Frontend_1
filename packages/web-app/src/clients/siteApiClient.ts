import { ApiClientBase } from "@project/components/src/api/apiClientBase";
import { ClientRouteDto } from "src/interfaces/clientRouteDto";
import { CatalogFilterDto, CatalogResponseDto } from "src/interfaces/catalogFilterDto";

export interface CatalogFilterRequestDto {
  identifier: string;
  values: number[];
}

export class SiteApiClient extends ApiClientBase {
  async route(lang: string, elements: string[]): Promise<ClientRouteDto> {
    const url = "route/" + lang + "/" + elements.join("/");
    return this.sendRequest<ClientRouteDto>(url);
  }

  async getCatalogFilters(lang: string, entityType: string): Promise<CatalogFilterDto[]> {
    const url = `catalog/${entityType}/filters/${lang}`;
    const res = await this.sendRequest<{ filters: CatalogFilterDto[] }>(url);
    return res.filters;
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
      filters: filters
    };
    return this.sendRequest<CatalogResponseDto<T>>(url, req);
  }
}

export const siteApi = new SiteApiClient();
