import { Dictionary } from "../utils/types";

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

export interface AdminTraitTypeDto {
  id: number;
  names: Dictionary<string>;
  identifier: string;
  order: number;
}
