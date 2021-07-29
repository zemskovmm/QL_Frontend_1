import { Loadable } from "../../../utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "../../RootStore";
import { AdminApi } from "../../../clients/adminApiClient";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "../../../components/remoteui/AdminLanguageDictionaryEditor";
import { Dictionary } from "../../../utils/types";
import { TraitLoader } from "../../../components/traitEditor";
import { AdminTraitListItemDto } from "../../../interfaces/TraitPageDto";

const emptyModel = ({ languages: { en: {} } } as unknown) as AdminCourseDto<unknown>;

export type AdminCourseLanguageDto<T extends unknown> = {
  name: string;
  htmlDescription: string;
  url: string;
  metadata?: T;
};

export type AdminSchoolDtoLanguagesDict = Dictionary<AdminCourseLanguageDto<unknown>>;

export type AdminCourseDto<T extends unknown> = {
  id: string;
  schoolId?: number;
  languages: AdminSchoolDtoLanguagesDict;
};

export class CourseTraitLoader implements TraitLoader {
  @observable courseId?: number;
  @observable traitCache: AdminTraitListItemDto[] = [];
  @observable traitTypes: AdminTraitListItemDto[] = [];
  @observable traitTypesIds: number[] = [];
  @observable activeType: number = 0;

  @action async addTraitToItem(traitId: number) {}

  @action async deleteTraitToItem(traitId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  @action async getActiveTraits(): Promise<number[]> {
    return Promise.resolve([]);
  }

  @action async getAvailableTraits(): Promise<AdminTraitListItemDto[]> {
    AdminApi.getTraitList();
    return Promise.resolve([]);
  }

  @action private async fetchLists() {
    this.traitTypes = await AdminApi.getTraitList();
    this.traitTypesIds = await AdminApi.getTraitAvailable(`${this.activeType}`);
    this.traitCache = this.traitTypes.filter((x) => this.traitTypesIds.includes(x.id));
  }

  @action async reload(): Promise<void> {
    this.traitCache = [];
    this.traitTypes = [];
    await this.fetchLists();
  }
}

export class CourseEditPageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;
  @observable id = 0;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  @action async loadById(id: number) {
    this.id = id;
    await this.load();
  }

  @action async save() {
    const data = await this.remoteUiStore?.getDataAsync();
    if (data) await AdminApi.updateCourse(this.id, data as AdminCourseDto<unknown>);
    alert("Entity updated");
  }

  async load(): Promise<void> {
    const value = await this.track(() => AdminApi.getCourse(this.id));
    const definition = await this.track(() => AdminApi.definitionCourses());
    this.remoteUiStore = new RemoteUiEditorStore(definition, value, new LanguageDictionaryCustomize(value.languages));
  }
}

export class CreateCoursePageStore extends Loadable {
  @observable.ref remoteUiStore?: RemoteUiEditorStore;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  async save() {
    const data = await this.remoteUiStore?.getDataAsync();
    if (data) await AdminApi.createCourse(data as AdminCourseDto<unknown>);
    alert("Entity created");
  }

  @action async load(): Promise<void> {
    const def = await AdminApi.definitionCourses();
    this.remoteUiStore = new RemoteUiEditorStore(
      def,
      emptyModel,
      new LanguageDictionaryCustomize(emptyModel.languages)
    );
  }
}

export class CourseListStore extends Loadable {
  @observable items: AdminCourseDto<unknown>[] = [];
  @observable totalPages: number = 1;
  @observable currentPage: number = 1;
  @observable root: RootStore;

  constructor(public rootStore: RootStore) {
    super();
    this.root = rootStore;
  }

  @action async load(): Promise<void> {
    this.items = await this.track(() => AdminApi.getCourseList());
  }
}