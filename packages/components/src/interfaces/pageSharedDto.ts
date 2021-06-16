export interface PageBlockRowDto {
  blocks: PageBlockDto[];
  maxWidth?: string;
  background?: string;
  hide: boolean;
}

export interface PageBlockDto {
  size: number;
  type: string;
  data: any;
  hide: boolean;
}

export interface PageDataDto {
  rows: PageBlockRowDto[];
}
