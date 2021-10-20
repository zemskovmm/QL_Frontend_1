import { observable } from "mobx";
import { RouterState, RouterStore } from "mobx-state-router";
import { Routes } from "src/routing/routes";
import { PageEditorPageStore } from "src/stores/pages/page/pageEditorPageStore";
import { PageListPageStore } from "src/stores/pages/page/pageListPageStore";
import { PageTraitEditPageStore } from "./pages/page/pageTraitEditPageStore";
import { TraitListPageStore } from "./pages/trait/traitListPageStore";
import { TraitPageStore } from "./pages/trait/traitPageStore";
import { NewTraitItemPageStore, TraitItemPageStore } from "./pages/trait/traitItemPageStore";
import { UniversityListPageStore } from "./pages/university/universityListPageStore";
import { UniversityPageStore } from "./pages/university/universityPageStore";
import { UniversityCreatePageStore } from "./pages/university/universityCreatePageStore";
import { UniversityTraitEditPageStore } from "./pages/university/universityTraitEditPageStore";
import {
  CreateSchoolPageStore,
  SchoolListPageStore,
  SchoolPageStore,
  SchoolTraitEditorStore,
} from "./pages/school/schoolPageStore";
import {
  CourseEditPageStore,
  CourseListStore,
  CourseTraitEditorStore,
  CreateCoursePageStore,
} from "./pages/course/coursePageStore";
import { CreateTraitTypePageStore, EditTraitTypePageStore } from "./pages/trait/createTraitTypePageStore";
import { GlobalSettingsPageStore } from "./pages/globalSettings/globalSettingsPageStore";
import { LoginStore } from "./pages/login/login";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable pageEditorPage = new PageEditorPageStore(this);
  @observable pageListPage = new PageListPageStore();
  @observable pageTraitEditPage = new PageTraitEditPageStore(this);
  @observable globalSettingsPage = new GlobalSettingsPageStore(this);
  @observable loginStore = new LoginStore(this);

  @observable traitListPage = new TraitListPageStore(this);
  @observable traitPage = new TraitPageStore(this);
  @observable traitItemPage = new TraitItemPageStore(this);
  @observable traitNewItemPage = new NewTraitItemPageStore(this);

  @observable traitTypeNewPage = new CreateTraitTypePageStore(this);
  @observable traitTypeEditPage = new EditTraitTypePageStore(this);

  @observable universityListPage = new UniversityListPageStore(this);
  @observable universityPage = new UniversityPageStore(this);
  @observable universityCreatePage = new UniversityCreatePageStore(this);
  @observable universityTraitEditPage = new UniversityTraitEditPageStore(this);

  @observable schoolListPage = new SchoolListPageStore(this);
  @observable schoolPage = new SchoolPageStore(this);
  @observable schoolPageCreate = new CreateSchoolPageStore(this);
  @observable schoolTraitEditor = new SchoolTraitEditorStore(this);

  @observable courseListPage = new CourseListStore(this);
  @observable courseCreate = new CreateCoursePageStore(this);
  @observable courseEdit = new CourseEditPageStore(this);
  @observable courseTraitEditor = new CourseTraitEditorStore(this);
}
