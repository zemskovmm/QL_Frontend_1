export interface AdminTraitListItemDto {
  id: number;
  names: { [name: string]: string };
  identifier: string;
}

export interface AdminTraitItemDto {
  traitTypeId: number;
  names: { [name: string]: string };
  iconId: number | null;
  order: number | null;
  parentId: number | null;
}

