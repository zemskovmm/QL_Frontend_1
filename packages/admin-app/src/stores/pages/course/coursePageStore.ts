import { Loadable } from "../../../utils/Loadable";
import { action, observable, runInAction } from "mobx";
import { RootStore } from "../../RootStore";
import { AdminApi } from "../../../clients/adminApiClient";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { LanguageDictionaryCustomize } from "../../../components/remoteui/AdminLanguageDictionaryEditor";
import { Dictionary } from "../../../utils/types";
import { TraitEditorStore, TraitLoader, TraitLoaderWithCache } from "../../../components/traitEditor";
import { AdminTraitTypeDto } from "../../../interfaces/TraitPageDto";

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

export class CourseTraitLoader extends TraitLoaderWithCache {
  @observable courseId = 0;

  @observable async setCourseId(id: number) {
    this.courseId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToCourse(this.courseId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromCourse(this.courseId, traitId);
  }

  async loadActiveTraits(): Promise<number[]> {
    return await AdminApi.getActiveTraitsByCourseId(this.courseId);
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
export class CourseTraitEditorStore {
  @observable root: RootStore;
  @observable traitStore: TraitEditorStore<CourseTraitLoader>;

  constructor(public rootStore: RootStore) {
    this.root = rootStore;
    this.traitStore = new TraitEditorStore<CourseTraitLoader>(new CourseTraitLoader());
  }

  @action async loadStore(id: number) {
    this.traitStore.page = 0;
    await this.traitStore.traitLoader.setCourseId(id);
    await this.traitStore.refresh({});
  }
}
