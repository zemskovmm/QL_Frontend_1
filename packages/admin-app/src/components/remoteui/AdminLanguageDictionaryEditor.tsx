import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiDefinition,
  RemoteUiEditor,
  RemoteUiEditorConfiguration,
  RemoteUiEditorStore,
} from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import {
  AdminSchoolDto,
  AdminSchoolDtoLanguagesDict,
  AdminSchoolLanguageDto,
} from "../../stores/pages/school/schoolPageStore";
import { FC, useState } from "react";
import Select from "@project/components/src/ui/Select/Select";
import { AllLanguages } from "@project/components/src/utils/langs";
import { AdminButton } from "../common/AdminButton";
import { useObserver } from "mobx-react";

const createDefinition = (name: string): RemoteUiDefinition => ({
  groups: [
    {
      name,
      fields: [
        {
          name: "name",
          id: "name",
          type: "String",
          alwaysExpanded: false,
        },
        {
          name: "htmlDescription",
          id: "htmlDescription",
          type: "String",
          alwaysExpanded: false,
        },
        {
          name: "url",
          id: "url",
          type: "String",
          alwaysExpanded: false,
        },
      ],
    },
  ],
  types: {},
});

const selectItems = [
  { id: "RU", name: AllLanguages.ru.title },
  { id: "EN", name: AllLanguages.en.title },
  { id: "FR", name: AllLanguages.fr.title },
  { id: "SP", name: AllLanguages.esp.title },
  { id: "CN", name: AllLanguages.cn.title },
];

export class SchoolPageCustomize implements IRemoteUiEditorStoreCustomization {
  // TODO AdminSchoolDto в пропах - является костылем, что бы подпереть недогенерированные филды из за типа Dictionary'2 вместо LanguageDictionary
  constructor(public item: AdminSchoolDto<unknown>) {}

  getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
    if (type === "LanguageDictionary")
      return new AdminLanguageDictionaryEditorStore(config.definition, this.item.languages);
    return null!;
  }
}

export class AdminLanguageDictionaryEditorStore implements IRemoteUiData {
  isValid = true;
  @observable items: AdminSchoolDtoLanguagesDict;
  @observable itemsStores: { [id: string]: RemoteUiEditorStore };

  constructor(definition: RemoteUiDefinition, items: AdminSchoolDtoLanguagesDict) {
    const reduceToRemoteUiStores = (acc: {}, x: string) => ({
      ...acc,
      [x]: new RemoteUiEditorStore(createDefinition(x), items[x]),
    });

    this.items = items;
    const keys = Object.keys(items);
    this.itemsStores = keys.reduce(reduceToRemoteUiStores, {} as any);
  }

  async getData() {
    const keys = Object.keys(this.itemsStores);
    const res: AdminSchoolDtoLanguagesDict = {};

    for (const key of keys) res[key] = (await this.itemsStores[key]?.getDataAsync()) as AdminSchoolLanguageDto<unknown>;
    return res;
  }

  @action insertLanguageField(lang: string) {
    const keys = Object.keys(this.itemsStores);
    const langKeys = Object.keys(AllLanguages);
    const langLower = lang.toLowerCase();
    if (keys.find((x) => x === langLower) && langKeys.find((x) => x === langLower)) return;
    this.itemsStores = { ...this.itemsStores, [langLower]: new RemoteUiEditorStore(createDefinition(langLower), {}) };
  }

  @action removeLanguageField(lang: string) {
    const langLower = lang.toLowerCase();
    const objKeys = Object.keys(this.itemsStores);

    if (objKeys.length === 1) return;

    this.itemsStores = objKeys.reduce(
      (acc, x) => (x === langLower ? { ...acc } : { ...acc, [x]: this.itemsStores[x] }),
      {}
    );
  }
}

export const AdminRemoteUiLanguageDictionaryEditor: FC<{ store: AdminLanguageDictionaryEditorStore }> = ({ store }) => {
  const [lang, setLang] = useState({ id: "RU", name: AllLanguages.ru.title });
  const keys = Object.keys(store.itemsStores);
  return useObserver(() => (
    <div>
      <div>
        <h2>Add language parameters</h2>
        <div className="flex">
          <div className="flex-grow">
            <Select
              value={lang.name}
              options={selectItems}
              selectChange={(value, id) => setLang({ id: id as string, name: value })}
            />
          </div>

          <AdminButton color={"default"} onClick={() => store.insertLanguageField(lang.id)}>
            Add
          </AdminButton>
        </div>
      </div>
      <div>
        {keys.map((x) => (
          <div>
            <RemoteUiEditor store={store.itemsStores[x]} />
            <AdminButton color={"danger"} onClick={() => store.removeLanguageField(x)}>
              Remove
            </AdminButton>
          </div>
        ))}
      </div>
    </div>
  ));
};
