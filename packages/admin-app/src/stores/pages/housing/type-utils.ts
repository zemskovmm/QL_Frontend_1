import { Dictionary } from "../../../utils/types";
import { get, set } from "lodash";

export type AdminHousingAccommodationDtoLanguagesDict = Dictionary<string>;
export type AdminHousingAccommodationDtoLanguagesDictRemoteUi = Dictionary<{ name: string }>;
type LangDicToRemoteUi = (
  target: AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDict>
) => AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDictRemoteUi>;
type FromRemoteUiToDic = (
  target: AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDictRemoteUi>
) => AdminHousingAccommodationDto<AdminHousingAccommodationDtoLanguagesDict>;

export type AdminHousingAccommodationDto<T extends Dictionary<unknown>> = {
  id: number;
  housingId: number;
  names: T;
};

export const mapToRemoteUi: LangDicToRemoteUi = (target) => ({
  ...target,
  names: Object.keys(target.names).reduce(
    (acc, x, _, t) => set(acc, x, { name: get(target.names, x, { name: "" }) }),
    {} as AdminHousingAccommodationDtoLanguagesDictRemoteUi
  ),
});
export const mapFromRemoteUi: FromRemoteUiToDic = (target) => ({
  ...target,
  names: Object.keys(target.names).reduce(
    (acc, x, _, t) => set(acc, x, get(target.names, `${x}.name`, "")),
    {} as AdminHousingAccommodationDtoLanguagesDict
  ),
});
