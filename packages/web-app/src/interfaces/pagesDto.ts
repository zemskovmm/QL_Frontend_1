export interface PageListItemDto {
  title: string;
  block: any;
  previewImageId: number | null;
  smallPreviewImageId: number | null;
  widePreviewImageId: number | null;
  date: string | null;
  pageType: string;
  namedTraits: { [name: string]: PageTraitDto[] };
}

export interface PageTraitDto {
  id: number;
  name: string;
  identifier: string;
  iconId: number | null;
}

export interface PageListDto {
  totalPages: number;
  items: PageListItemDto[];
  totalItems: number;
}
