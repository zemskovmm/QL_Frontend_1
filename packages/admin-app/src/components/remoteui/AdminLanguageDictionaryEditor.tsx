import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiDefinition,
  RemoteUiEditor,
  RemoteUiEditorConfiguration,
  RemoteUiEditorStore,
} from "@kekekeks/remoteui/src";
import { action, observable } from "mobx";
import { AdminSchoolDtoLanguagesDict } from "src/stores/pages/adminStores/school/schoolPageStore";
import { FC, useState } from "react";
import Select from "@project/components/src/ui/Select/Select";
import { AllLanguages } from "@project/components/src/utils/langs";
import { AdminButton } from "../common/AdminButton";
import { useObserver } from "mobx-react";
import { Dictionary } from "../../utils/types";

export type PageDefinitionBuilder = (name: string) => RemoteUiDefinition;
export const traitEditLanguageDefinition: PageDefinitionBuilder = (name) => ({
  groups: [
    {
      name,
      fields: [
        {
          name: "name",
          id: "name",
          type: "String",
          alwaysExpanded: false,
        } as any,
      ],
    },
  ],
  types: {},
});
export const pageLanguageDefinition: PageDefinitionBuilder = (name) => ({
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
          type: "TextArea",
          alwaysExpanded: false,
        },
        {
          name: "url",
          id: "url",
          type: "String",
          alwaysExpanded: false,
        },
      ] as any[],
    },
  ],
  types: {},
});

export type AdminPlainDict = Dictionary<{ name: string }>;
export const plainDictionaryDefinition: PageDefinitionBuilder = (name) => ({
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
      ] as any[],
    },
  ],
  types: {},
});

const selectItems = [
  { id: "RU", name: AllLanguages.ru.title },
  { id: "EN", name: AllLanguages.en.title },
  { id: "FR", name: AllLanguages.fr.title },
  { id: "ESP", name: AllLanguages.esp.title },
  { id: "CN", name: AllLanguages.cn.title },
];

export class LanguageDictionaryCustomize<T extends Dictionary<unknown>> implements IRemoteUiEditorStoreCustomization {
  // TODO Dictionary<unknown> (оно же T) в пропах - является костылем, что бы подпереть недогенерированные филды из за типа Dictionary'2 вместо LanguageDictionary
  constructor(public item: T) {}

  getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
    if (type === "LanguageDictionary") return new AdminLanguageDictionaryEditorStore(pageLanguageDefinition, this.item);
    if (type === "TraitLanguageDictionary")
      return new AdminLanguageDictionaryEditorStore(traitEditLanguageDefinition, this.item);
    if (type === "PlainDictionary") return new AdminPlainDictionaryEditorStore(plainDictionaryDefinition, this.item);
    return null!;
  }
}

export class AdminLanguageDictionaryEditorStore<T extends Dictionary<unknown>> implements IRemoteUiData {
  isValid = true;
  @observable definition: PageDefinitionBuilder;
  @observable items: T;
  @observable itemsStores: Dictionary<RemoteUiEditorStore>;

  constructor(definition: PageDefinitionBuilder, items: T) {
    this.definition = definition;
    const reduceToRemoteUiStores = (acc: {}, x: string) => ({
      ...acc,
      [x]: new RemoteUiEditorStore(definition(x), items[x]),
    });

    this.items = items;
    const keys = Object.keys(items);
    this.itemsStores = keys.reduce(reduceToRemoteUiStores, {} as any);
  }

  async getData() {
    const keys = Object.keys(this.itemsStores);
    const res: Dictionary<unknown> = {};

    for (const key of keys) res[key] = await this.itemsStores[key]?.getDataAsync();
    return res;
  }

  @action insertLanguageField(lang: string) {
    const keys = Object.keys(this.itemsStores);
    const langKeys = Object.keys(AllLanguages);
    const langLower = lang.toLowerCase();
    if (keys.find((x) => x === langLower) && langKeys.find((x) => x === langLower)) return;
    this.itemsStores = {
      ...this.itemsStores,
      [langLower]: new RemoteUiEditorStore(this.definition(langLower), {}),
    };
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
export class AdminPlainDictionaryEditorStore<
  T extends Dictionary<unknown>
> extends AdminLanguageDictionaryEditorStore<T> {}
// COMPONENTS

export const AdminRemoteUiLanguageDictionaryEditor: FC<{
  store: AdminLanguageDictionaryEditorStore<AdminSchoolDtoLanguagesDict>;
}> = ({ store }) => {
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

export const AdminRemoteUiPlainDictionaryEditor: FC<{
  store: AdminLanguageDictionaryEditorStore<AdminPlainDict>;
}> = ({ store }) => {
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
