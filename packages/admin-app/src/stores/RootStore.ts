import { observable } from "mobx";
import { RouterState, RouterStore } from "mobx-state-router";
import { Routes } from "src/routing/routes";
import { PageEditorPageStore } from "src/stores/pages/adminStores/page/pageEditorPageStore";
import { PageListPageStore } from "src/stores/pages/adminStores/page/pageListPageStore";
import { PageTraitEditPageStore } from "./pages/adminStores/page/pageTraitEditPageStore";
import { TraitListPageStore } from "./pages/adminStores/trait/traitListPageStore";
import { TraitPageStore } from "./pages/adminStores/trait/traitPageStore";
import { NewTraitItemPageStore, TraitItemPageStore } from "./pages/adminStores/trait/traitItemPageStore";
import { UniversityListPageStore } from "./pages/adminStores/university/universityListPageStore";
import { UniversityPageStore } from "./pages/adminStores/university/universityPageStore";
import { UniversityCreatePageStore } from "./pages/adminStores/university/universityCreatePageStore";
import { UniversityTraitEditPageStore } from "./pages/adminStores/university/universityTraitEditPageStore";
import {
  CreateSchoolPageStore,
  SchoolListPageStore,
  SchoolPageStore,
  SchoolTraitEditorStore,
} from "./pages/adminStores/school/schoolPageStore";
import {
  CourseEditPageStore,
  CourseListStore,
  CourseTraitEditorStore,
  CreateCoursePageStore,
} from "./pages/adminStores/course/coursePageStore";
import { CreateTraitTypePageStore, EditTraitTypePageStore } from "./pages/adminStores/trait/createTraitTypePageStore";
import { GlobalSettingsPageStore } from "./pages/adminStores/globalSettings/globalSettingsPageStore";
import { FormEditorPageStore } from "src/pages/Admin/globalSetting/formEditorPage/FormEditorPageStore";
import { LoginStore } from "./pages/login/login";
import { ManagerCreateStore } from "./pages/adminStores/manager/managerCreateStore";
import { ManagerApplicationListStore } from "./pages/managerStores/applicationList/managerApplicationListStore";
import {
  CreateHousingPageStore,
  HousingEditPageStore,
  HousingListStore,
  HousingTraitEditorStore,
} from "./pages/housing/housing-page-store";
import {
  CreateHousingAccommodationPageStore,
  HousingAccommodationEditPageStore,
  HousingAccommodationListStore,
  HousingAccommodationTraitEditorStore,
} from "./pages/housing/housing-accommodation-page-store";
import { ManagerApplicationStore } from "./pages/managerStores/application/managerApplicationStore";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable pageEditorPage = new PageEditorPageStore(this);
  @observable pageListPage = new PageListPageStore();
  @observable pageTraitEditPage = new PageTraitEditPageStore(this);
  @observable globalSettingsPage = new GlobalSettingsPageStore(this);
  @observable formEditorPage = new FormEditorPageStore(this);
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

  @observable housingListPage = new HousingListStore(this);
  @observable housingCreate = new CreateHousingPageStore(this);
  @observable housingEdit = new HousingEditPageStore(this);
  @observable housingTraitEditor = new HousingTraitEditorStore(this);

  @observable housingAccommodationListPage = new HousingAccommodationListStore(this);
  @observable housingAccommodationCreate = new CreateHousingAccommodationPageStore(this);
  @observable housingAccommodationEdit = new HousingAccommodationEditPageStore(this);
  @observable housingAccommodationTraitEditor = new HousingAccommodationTraitEditorStore(this);

  @observable mangerCreatePage = new ManagerCreateStore(this);

  /* Manager Shell */
  @observable mangerApplicationListPage = new ManagerApplicationListStore(this);
  @observable mangerApplicationPage = new ManagerApplicationStore(this);
}
