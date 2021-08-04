export interface PageListItemDto {
  id: number;
  urls: { [name: string]: string };
  titles: { [name: string]: string };
  previewImages: { [name: string]: number | null };
  smallPreviewImages: { [name: string]: number | null };
  widePreviewImages: { [name: string]: number | null };
  metadata: { [name: string]: string | null };
  date: { [name: string]: string | null };
}

export interface PageListDto {
  totalPages: number;
  results: PageListItemDto[];
}
