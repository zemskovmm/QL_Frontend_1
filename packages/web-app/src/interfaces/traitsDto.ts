export interface TraitDto {
  id: number;
  traitTypeId: number;
  names: { [key: string]: string };
  identifier: string;
  iconId: number | null;
  order: number;
  parentId: number | null;
}
