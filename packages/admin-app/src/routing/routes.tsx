import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "./route";
import { IndexPage } from "src/pages/LoginPage/indexPage";
import { UserAuthorizedHook, UserAuthorizedOnlyHook } from "./routehooks";
import { PageEditorPage } from "../pages/page/pageEditorPage";
import { PageListPage } from "../pages/page/pageListPage";
import { PageTraitEditorPage } from "../pages/page/pageTraitEditPage";
import { FilesPage } from "../pages/files/filesPage";
import { TraitListPage } from "../pages/trait/traitListPage";
import { TraitPage } from "../pages/trait/traitPage";
import { NewTraitPage, TraitItemPage } from "../pages/trait/traitItemPage";
import { UniversityListPage } from "../pages/university/universityListPage";
import { UniversityPage } from "../pages/university/universityPage";
import { UniversityCreatePage } from "../pages/university/universityCreatePage";
import { UniversityTraitEditorPage } from "../pages/university/universityTraitEditPage";
import { CreateSchoolPage, SchoolListPage, SchoolPage, SchoolTraitEditorPage } from "../pages/school/page";
import { CourseCreatePage, CourseEditPage, CourseListPage, CourseTraitEditorPage } from "../pages/course/page";
import { TraitTypeEditPage, TraitTypeNewPage } from "../pages/trait/traitTypeNewPage";
import { AdminGlobalSettingEditor } from "../pages/globalSetting/page";
import { FormEditorPage } from "../pages/globalSetting/formEditorPage/formEditorPage";
import { NotFoundPage } from "../pages/NotFounds/NotFoundPage";
import { ManagerCreatePage } from "../pages/Manager/ManagerCreate/ManagerCreatePage";

export enum RouteNames {
  notFound = "not-found",
  index = "index",
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
}

export const AnonRouteViewMap = {
  [RouteNames.notFound]: <NotFoundPage />,
  [RouteNames.index]: <IndexPage />,
};

export const AdminRouteViewMap = {
  [RouteNames.newPage]: <PageEditorPage />,
  [RouteNames.editPage]: <PageEditorPage />,
  [RouteNames.pageList]: <PageListPage />,
  [RouteNames.pageTraitEditPage]: <PageTraitEditorPage />,
  [RouteNames.globalSettingsEditor]: <AdminGlobalSettingEditor />,
  [RouteNames.formEditorPageProfile]: <FormEditorPage />,
  [RouteNames.formEditorPageVisa]: <FormEditorPage />,
  [RouteNames.formEditorPageCourse]: <FormEditorPage />,
  [RouteNames.formEditorPageUniversity]: <FormEditorPage />,
  [RouteNames.formEditorPageHousing]: <FormEditorPage />,

  [RouteNames.fileList]: <FilesPage />,

  [RouteNames.traitList]: <TraitListPage />,
  [RouteNames.traitPage]: <TraitPage />,
  [RouteNames.traitCreate]: <NewTraitPage />,
  [RouteNames.traitTypeEdit]: <TraitTypeEditPage />,
  [RouteNames.traitTypeCreate]: <TraitTypeNewPage />,
  [RouteNames.traitItemPage]: <TraitItemPage />,

  [RouteNames.universityList]: <UniversityListPage />,
  [RouteNames.universityPage]: <UniversityPage />,
  [RouteNames.universityCreatePage]: <UniversityCreatePage />,
  [RouteNames.universityTraitEditPage]: <UniversityTraitEditorPage />,

  [RouteNames.schoolList]: <SchoolListPage />,
  [RouteNames.schoolPage]: <SchoolPage />,
  [RouteNames.schoolCreate]: <CreateSchoolPage />,
  [RouteNames.schoolTraitEditor]: <SchoolTraitEditorPage />,

  [RouteNames.courseCreate]: <CourseCreatePage />,
  [RouteNames.coursePage]: <CourseEditPage />,
  [RouteNames.courseList]: <CourseListPage />,
  [RouteNames.courseTraitEditor]: <CourseTraitEditorPage />,

  [RouteNames.mangerCreate]: <ManagerCreatePage />,
};

export const AnonRoutes: Route[] = convertRoutes([
  {
    pattern: "/not-found",
    name: RouteNames.notFound,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/",
    name: RouteNames.index,
    hooks: [UserAuthorizedHook],
    onEnter: (root) => root.loginStore.reset(),
  },
]);

export const AdminRoutes: Route[] = convertRoutes([
  {
    pattern: "/global-settings/:lang",
    name: RouteNames.globalSettingsEditor,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.globalSettingsPage.load(to.params["lang"]),
  },
  {
    pattern: "/form-editor/:lang/visa",
    name: RouteNames.formEditorPageVisa,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "visa"),
  },
  {
    pattern: "/form-editor/:lang/course",
    name: RouteNames.formEditorPageCourse,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "course"),
  },
  {
    pattern: "/form-editor/:lang/university",
    name: RouteNames.formEditorPageUniversity,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "university"),
  },
  {
    pattern: "/form-editor/:lang/profile",
    name: RouteNames.formEditorPageProfile,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "profile"),
  },
  {
    pattern: "/form-editor/:lang/housing",
    name: RouteNames.formEditorPageHousing,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.formEditorPage.load(to.params["lang"], "housing"),
  },
  {
    pattern: "/pages",
    name: RouteNames.pageList,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/pages/new",
    name: RouteNames.newPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.pageEditorPage.load(),
  },
  {
    pattern: "/pages/:id",
    name: RouteNames.editPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.pageEditorPage.load(parseInt(to.params["id"])),
  },
  {
    pattern: "/pages/:id/traits",
    name: RouteNames.pageTraitEditPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.pageTraitEditPage.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/files",
    name: RouteNames.fileList,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/traits",
    name: RouteNames.traitList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.traitListPage.load(),
  },
  {
    pattern: "/traits/new",
    name: RouteNames.traitTypeCreate,
    hooks: [UserAuthorizedOnlyHook],
    async onEnter(root) {
      await root.traitTypeNewPage.load();
    },
  },
  {
    pattern: "/traits/:id",
    name: RouteNames.traitPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.traitPage.load(to.params.id),
  },
  {
    pattern: "/traits/:id/edit",
    name: RouteNames.traitTypeEdit,
    hooks: [UserAuthorizedOnlyHook],
    async onEnter(root, to) {
      root.traitTypeEditPage.traitTypeId = to.params.id;
      await root.traitTypeEditPage.load();
    },
  },
  {
    pattern: "/traits/:id/new",
    name: RouteNames.traitCreate,
    hooks: [UserAuthorizedOnlyHook],
    async onEnter(root, to) {
      root.traitNewItemPage.traitTypeId = Number(to.params.id);
      await root.traitNewItemPage.load();
    },
  },
  {
    pattern: "/traits/item/:id",
    name: RouteNames.traitItemPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.traitItemPage.load(to.params.id),
  },
  {
    pattern: "/universities",
    name: RouteNames.universityList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.universityListPage.load(),
  },
  {
    pattern: "/universities/create",
    hooks: [UserAuthorizedOnlyHook],
    name: RouteNames.universityCreatePage,
  },
  {
    pattern: "/universities/:id",
    name: RouteNames.universityPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.universityPage.load(to.params.id),
  },
  {
    pattern: "/universities/:id/trait",
    name: RouteNames.universityTraitEditPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.universityTraitEditPage.loadStore(Number(to.params.id)),
  },

  {
    pattern: "/school",
    name: RouteNames.schoolList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.schoolListPage.load(),
  },
  {
    pattern: "/school/create",
    name: RouteNames.schoolCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.schoolPageCreate.load(),
  },
  {
    pattern: "/school/:id",
    name: RouteNames.schoolPage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => {
      await root.schoolPage.loadById(Number(to.params.id));
    },
  },
  {
    pattern: "/school/:id/traits",
    name: RouteNames.schoolTraitEditor,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.schoolTraitEditor.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/course",
    name: RouteNames.courseList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.courseListPage.load(),
  },
  {
    pattern: "/course/create",
    name: RouteNames.courseCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.courseCreate.load(),
  },
  {
    pattern: "/course/:id",
    name: RouteNames.coursePage,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => {
      await root.courseEdit.loadById(Number(to.params.id));
    },
  },
  {
    pattern: "/course/:id/traits",
    name: RouteNames.courseTraitEditor,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.courseTraitEditor.loadStore(Number(to.params.id)),
  },
  {
    pattern: "/manager/create",
    name: RouteNames.mangerCreate,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.mangerCreatePage.reset(),
  },
]);

export const Routes: Route[] = AnonRoutes.concat(AdminRoutes);
