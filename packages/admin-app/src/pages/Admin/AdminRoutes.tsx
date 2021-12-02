import React from "react";
import { Route, RouterState } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";
import { RouteTransitionHook } from "src/routing/routehooks";
import { PageEditorPage } from "./pageEditor/pageEditorPage";
import { PageListPage } from "./pageEditor/pageListPage";
import { PageTraitEditorPage } from "./pageEditor/pageTraitEditPage";
import { AdminGlobalSettingEditor } from "./globalSetting/page";
import { FormEditorPage } from "./globalSetting/formEditorPage/formEditorPage";
import { FilesPage } from "./files/filesPage";
import { TraitListPage } from "./trait/traitListPage";
import { TraitPage } from "./trait/traitPage";
import { NewTraitPage, TraitItemPage } from "./trait/traitItemPage";
import { TraitTypeEditPage, TraitTypeNewPage } from "./trait/traitTypeNewPage";
import { UniversityListPage } from "./university/universityListPage";
import { UniversityPage } from "./university/universityPage";
import { UniversityCreatePage } from "./university/universityCreatePage";
import { UniversityTraitEditorPage } from "./university/universityTraitEditPage";
import { CreateSchoolPage, SchoolListPage, SchoolPage, SchoolTraitEditorPage } from "./school/page";
import { CourseCreatePage, CourseEditPage, CourseListPage, CourseTraitEditorPage } from "./course/page";
import { ManagerCreatePage } from "./ManagerCreate/ManagerCreatePage";
import { RouteNames } from "../../routing/routes";
import {
  HousingAccommodationEdit,
  HousingAccommodationTraitEdit,
  HousingCreatePage,
  HousingEditPage,
  HousingTablePage,
  HousingTraitEditPage,
} from "./housing/page";

export const UserAuthorizedOnlyHook: RouteTransitionHook = async (root) => {
  if (!(await root.loginStore.check())) throw new RouterState(RouteNames.index);
};

export enum AdminRouteNames {
  pageList = "admin-pageList",
  editPage = "admin-editPage",
  newPage = "admin-newPage",
  pageTraitEditPage = "admin-pageTraitEditPage",
  globalSettingsEditor = "admin-globalSettingsEditor",
  formEditorPageVisa = "admin-formEditorPage-visa",
  formEditorPageCourse = "admin-formEditorPage-course",
  formEditorPageHousing = "admin-formEditorPage-housing",
  formEditorPageProfile = "admin-formEditorPage-profile",
  formEditorPageUniversity = "admin-formEditorPage-university",

  fileList = "admin-fileList",

  traitList = "admin-traitList",
  traitTypeCreate = "admin-traitTypeCreate",
  traitTypeEdit = "admin-traitTypeEdit",
  traitPage = "admin-traitPage",
  traitCreate = "admin-traitCreate",
  traitItemPage = "admin-traitItemPage",

  universityList = "admin-universityList",
  universityPage = "admin-universityPage",
  universityCreatePage = "admin-universityCreatePage",
  universityTraitEditPage = "admin-universityTraitEditPage",

  schoolList = "admin-schoolList",
  schoolPage = "admin-schoolPage",
  schoolCreate = "admin-schoolCreate",
  schoolTraitEditor = "admin-schoolTraitEditor",

  courseList = "admin-courseList",
  coursePage = "admin-coursePage",
  courseCreate = "admin-courseCreate",
  courseTraitEditor = "admin-courseTraitEditor",

  mangerCreate = "admin-mangerCreate",

  housingCreate = "admin-housing-create",
  housingList = "admin-housing-list",
  housingEdit = "admin-housing-edit",
  housingTraitEdit = "admin-housing-trait-edit",
  housingAccommodationEdit = "admin-accommodation-edit",
  housingAccommodationTraitEdit = "admin-accommodation-trait-edit",
}

export const AdminRouteViewMap = {
  [AdminRouteNames.newPage]: <PageEditorPage />,
  [AdminRouteNames.editPage]: <PageEditorPage />,
  [AdminRouteNames.pageList]: <PageListPage />,
  [AdminRouteNames.pageTraitEditPage]: <PageTraitEditorPage />,
  [AdminRouteNames.globalSettingsEditor]: <AdminGlobalSettingEditor />,
  [AdminRouteNames.formEditorPageProfile]: <FormEditorPage />,
  [AdminRouteNames.formEditorPageVisa]: <FormEditorPage />,
  [AdminRouteNames.formEditorPageCourse]: <FormEditorPage />,
  [AdminRouteNames.formEditorPageUniversity]: <FormEditorPage />,
  [AdminRouteNames.formEditorPageHousing]: <FormEditorPage />,

  [AdminRouteNames.fileList]: <FilesPage />,

  [AdminRouteNames.traitList]: <TraitListPage />,
  [AdminRouteNames.traitPage]: <TraitPage />,
  [AdminRouteNames.traitCreate]: <NewTraitPage />,
  [AdminRouteNames.traitTypeEdit]: <TraitTypeEditPage />,
  [AdminRouteNames.traitTypeCreate]: <TraitTypeNewPage />,
  [AdminRouteNames.traitItemPage]: <TraitItemPage />,

  [AdminRouteNames.universityList]: <UniversityListPage />,
  [AdminRouteNames.universityPage]: <UniversityPage />,
  [AdminRouteNames.universityCreatePage]: <UniversityCreatePage />,
  [AdminRouteNames.universityTraitEditPage]: <UniversityTraitEditorPage />,

  [AdminRouteNames.schoolList]: <SchoolListPage />,
  [AdminRouteNames.schoolPage]: <SchoolPage />,
  [AdminRouteNames.schoolCreate]: <CreateSchoolPage />,
  [AdminRouteNames.schoolTraitEditor]: <SchoolTraitEditorPage />,

  [AdminRouteNames.courseCreate]: <CourseCreatePage />,
  [AdminRouteNames.coursePage]: <CourseEditPage />,
  [AdminRouteNames.courseList]: <CourseListPage />,
  [AdminRouteNames.courseTraitEditor]: <CourseTraitEditorPage />,

  [AdminRouteNames.mangerCreate]: <ManagerCreatePage />,

  [AdminRouteNames.housingCreate]: <HousingCreatePage />,
  [AdminRouteNames.housingEdit]: <HousingEditPage />,
  [AdminRouteNames.housingList]: <HousingTablePage />,
  [AdminRouteNames.housingTraitEdit]: <HousingTraitEditPage />,
  [AdminRouteNames.housingAccommodationEdit]: <HousingAccommodationEdit />,
  [AdminRouteNames.housingAccommodationTraitEdit]: <HousingAccommodationTraitEdit />,
};

export const AdminRoutes: Route[] = convertRoutes([
  {
    pattern: "/global-settings/:lang",
    name: AdminRouteNames.globalSettingsEditor,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.globalSettingsPage.load(to.params["lang"]),
  },
  {
    pattern: "/form-editor/:lang/visa",
    name: AdminRouteNames.formEditorPageVisa,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "visa"),
  },
  {
    pattern: "/form-editor/:lang/course",
    name: AdminRouteNames.formEditorPageCourse,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "course"),
  },
  {
    pattern: "/form-editor/:lang/university",
    name: AdminRouteNames.formEditorPageUniversity,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "university"),
  },
  {
    pattern: "/form-editor/:lang/profile",
    name: AdminRouteNames.formEditorPageProfile,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "profile"),
  },
  {
    pattern: "/form-editor/:lang/housing",
    name: AdminRouteNames.formEditorPageHousing,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "housing"),
  },
  {
    pattern: "/pages",
    name: AdminRouteNames.pageList,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/pages/new",
    name: AdminRouteNames.newPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.pageEditorPage.load(),
  },
  {
    pattern: "/pages/:id",
    name: AdminRouteNames.editPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.pageEditorPage.load(parseInt(to.params["id"])),
  },
  {
    pattern: "/pages/:id/traits",
    name: AdminRouteNames.pageTraitEditPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.pageTraitEditPage.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/files",
    name: AdminRouteNames.fileList,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/traits",
    name: AdminRouteNames.traitList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.traitListPage.load(),
  },
  {
    pattern: "/traits/new",
    name: AdminRouteNames.traitTypeCreate,
    hooks: [UserAuthorizedOnlyHook],
    async onEnter(root) {
      await root.traitTypeNewPage.load();
    },
  },
  {
    pattern: "/traits/:id",
    name: AdminRouteNames.traitPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.traitPage.load(to.params.id),
  },
  {
    pattern: "/traits/:id/edit",
    name: AdminRouteNames.traitTypeEdit,
    hooks: [UserAuthorizedOnlyHook],
    async onEnter(root, to) {
      root.traitTypeEditPage.traitTypeId = to.params.id;
      await root.traitTypeEditPage.load();
    },
  },
  {
    pattern: "/traits/:id/new",
    name: AdminRouteNames.traitCreate,
    hooks: [UserAuthorizedOnlyHook],
    async onEnter(root, to) {
      root.traitNewItemPage.traitTypeId = Number(to.params.id);
      await root.traitNewItemPage.load();
    },
  },
  {
    pattern: "/traits/item/:id",
    name: AdminRouteNames.traitItemPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.traitItemPage.load(to.params.id),
  },
  {
    pattern: "/universities",
    name: AdminRouteNames.universityList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.universityListPage.load(),
  },
  {
    pattern: "/universities/create",
    hooks: [UserAuthorizedOnlyHook],
    name: AdminRouteNames.universityCreatePage,
  },
  {
    pattern: "/universities/:id",
    name: AdminRouteNames.universityPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.universityPage.load(to.params.id),
  },
  {
    pattern: "/universities/:id/trait",
    name: AdminRouteNames.universityTraitEditPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.universityTraitEditPage.loadStore(Number(to.params.id)),
  },

  {
    pattern: "/school",
    name: AdminRouteNames.schoolList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.schoolListPage.load(),
  },
  {
    pattern: "/school/create",
    name: AdminRouteNames.schoolCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.schoolPageCreate.load(),
  },
  {
    pattern: "/school/:id",
    name: AdminRouteNames.schoolPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => {
      await root.schoolPage.loadById(Number(to.params.id));
    },
  },
  {
    pattern: "/school/:id/traits",
    name: AdminRouteNames.schoolTraitEditor,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.schoolTraitEditor.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/course",
    name: AdminRouteNames.courseList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.courseListPage.load(),
  },
  {
    pattern: "/course/create",
    name: AdminRouteNames.courseCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.courseCreate.load(),
  },
  {
    pattern: "/course/:id",
    name: AdminRouteNames.coursePage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => {
      await root.courseEdit.loadById(Number(to.params.id));
    },
  },
  {
    pattern: "/course/:id/traits",
    name: AdminRouteNames.courseTraitEditor,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.courseTraitEditor.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/manager/create",
    name: AdminRouteNames.mangerCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root) => await root.mangerCreatePage.reset(),
  },
  {
    pattern: "/housing",
    name: AdminRouteNames.housingList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.housingListPage.load(),
  },
  {
    pattern: "/housing/create",
    name: AdminRouteNames.housingCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.housingCreate.load(),
  },
  {
    pattern: "/housing/:id/edit",
    name: AdminRouteNames.housingEdit,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.housingEdit.loadById(Number(to.params.id)),
  },
  {
    pattern: "/housing/:id/traits",
    name: AdminRouteNames.housingTraitEdit,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.housingTraitEditor.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/housing/:id/accommodation/:accid/edit",
    name: AdminRouteNames.housingAccommodationEdit,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/housing/:id/accommodation/:accid/traits",
    name: AdminRouteNames.housingAccommodationTraitEdit,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.housingAccommodationTraitEditor.loadStore(Number(to.params.id)),
  },
]);
