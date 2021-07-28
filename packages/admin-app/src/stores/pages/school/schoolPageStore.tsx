import { Loadable, RequestTracking } from "../../../utils/Loadable";
import { RootStore } from "../../RootStore";
import { observable } from "mobx";
import { AdminApi } from "../../../clients/adminApiClient";
import { RemoteUiDefinition, RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { SchoolPageCustomize } from "../../../components/remoteui/AdminLanguageDictionaryEditor";

const def: RemoteUiDefinition = {
  groups: [
    {
      name: "",
      fields: [
        {
          name: "id",
          id: "id",
          type: "Integer",
          alwaysExpanded: false,
        },
        {
          name: "foundationYear",
          id: "foundationYear",
          type: "Integer",
          alwaysExpanded: false,
          nullable: true,
        },
        {
          name: "languages",
          id: "languages",
          type: "Custom",
          alwaysExpanded: false,
          customType: "LanguageDictionary",
          possibleValues: [],
        },
      ],
    },
  ],
  types: {
    SchoolAdminDto: {
      groups: [
        {
          name: "",
          fields: [
            {
              name: "id",
              id: "id",
              type: "Integer",
              alwaysExpanded: false,
            },
            {
              name: "foundationYear",
              id: "foundationYear",
              type: "Integer",
              alwaysExpanded: false,
              nullable: true,
            },
            {
              name: "languages",
              id: "languages",
              type: "Custom",
              alwaysExpanded: false,
              customType: "LanguageDictionary",
              possibleValues: [],
            },
          ],
        },
      ],
    },
    "Dictionary`2": {
      groups: [
        {
          name: "",
          fields: [],
        },
      ],
    },
    SchoolLanguageAdminDto: {
      groups: [
        {
          name: "",
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
            {
              name: "metadata",
              id: "Metadata",
              type: "TextArea",
              alwaysExpanded: false,
            },
          ],
        },
      ],
    },
  },
};

export type AdminSchoolLanguageDto<T extends unknown> = {
  name: string;
  htmlDescription: string;
  url: string;
  metadata?: T;
};

export type AdminSchoolDtoLanguagesDict = { [id: string]: AdminSchoolLanguageDto<unknown> };

export type AdminSchoolDto<T extends unknown> = {
  id: string;
  foundationYear?: number;
  languages: AdminSchoolDtoLanguagesDict;
};

export class SchoolListPageStore extends Loadable {
  @observable items: AdminSchoolDto<unknown>[] = [];
  @observable totalPages: number = 1;
  @observable currentPage: number = 1;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async load(): Promise<void> {
    this.items = await this.track(() => AdminApi.getSchoolList());
  }
}

export class SchoolPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;
  @observable id = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async loadById(id: number) {
    this.id = id;
    await this.load();
  }

  async load(): Promise<void> {
    const { value, definition } = await this.track(() => AdminApi.getSchool(this.id));
    debugger;
    this.remoteUiStore = new RemoteUiEditorStore(def, value, new SchoolPageCustomize(value));
  }
}
