import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiDefinition,
  RemoteUiEditor,
  RemoteUiEditorConfiguration,
  RemoteUiEditorStore,
} from "@kekekeks/remoteui/src";
import { observable } from "mobx";
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
          name: "Name",
          id: "name",
          type: "String",
          alwaysExpanded: false,
        },
        {
          name: "HtmlDescription",
          id: "htmlDescription",
          type: "String",
          alwaysExpanded: false,
        },
        {
          name: "Url",
          id: "url",
          type: "String",
          alwaysExpanded: false,
        },
        {
          name: "Metadata",
          id: "metadata",
          type: "TextArea",
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
  // TODO AdminSchoolDto в пропах - является костылем что бы подпереть недогенерированные филды из за типа Dictionary'2 вместо LanguageDictionary
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
    this.items = items;
    const keys = Object.keys(items);
    this.itemsStores = keys.reduce(
      (acc, x) => ({ ...acc, [x]: new RemoteUiEditorStore(createDefinition(x), items[x]) }),
      {} as any
    );
  }

  async getData() {
    const keys = Object.keys(this.itemsStores);
    const res: AdminSchoolDtoLanguagesDict = {};
    for (const key in keys) res[key] = (await this.itemsStores[key].getDataAsync()) as AdminSchoolLanguageDto<unknown>;
    return res;
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

          <AdminButton color={"default"}>Add</AdminButton>
        </div>
      </div>
      <div>
        {keys.map((x) => (
          <RemoteUiEditor store={store.itemsStores[x]} />
        ))}
      </div>
    </div>
  ));
};
