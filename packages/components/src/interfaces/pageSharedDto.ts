export interface PageBlockRowDto {
  blocks: PageBlockDto[];
  maxWidth?: string;
  background?: string;
}

export interface PageBlockDto {
  size: number;
  type: string;
  data: any;
}

export interface PageDataDto {
  rows: PageBlockRowDto[];
}
