export interface PageBlockRowDto {
  blocks: PageBlockDto[];
}

export interface PageBlockDto {
  size: number;
  type: string;
  data: any;
}

export interface PageDataDto {
  rows: PageBlockRowDto[];
}
