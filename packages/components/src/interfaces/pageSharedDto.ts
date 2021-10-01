export interface PageBlockRowDto {
  blocks: PageBlockDto[];
  maxWidth: string;
  background: string;
  hide: boolean;
  vertical: string;
  hideHistory?: boolean;
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

export interface FormBlockRowDto {
  blocks: PageBlockDto[];
  maxWidth: string;
  background: string;
  hide: boolean;
  vertical: string;
  hideHistory?: boolean;
}
