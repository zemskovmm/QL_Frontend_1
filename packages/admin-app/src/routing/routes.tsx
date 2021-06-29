import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "./route";
import { IndexPage } from "src/pages/indexPage";
import { PageEditorPage } from "src/pages/pageEditorPage";
import { PageListPage } from "src/pages/pageListPage";
import { FilesPage } from "src/pages/filesPage";
import { TraitListPage } from "../pages/trait/traitListPage";
import { TraitPage } from "../pages/trait/traitPage";
import { TraitItemPage } from "../pages/trait/traitItemPage";
import { UniversityListPage } from "../pages/university/universityListPage";

export enum RouteNames {
  notFound = "not-found",
  index = "index",
  pageList = "pageList",
  editPage = "editPage",
  newPage = "newPage",
  fileList = "fileList",
  traitList = "traitList",
  traitPage = "traitPage",
  traitItemPage = "traitItemPage",
  universityList = "universityList",
}

export const RouteViewMap = {
  [RouteNames.notFound]: <div>404 - not found</div>,
  [RouteNames.index]: <IndexPage />,
  [RouteNames.newPage]: <PageEditorPage />,
  [RouteNames.editPage]: <PageEditorPage />,
  [RouteNames.pageList]: <PageListPage />,
  [RouteNames.fileList]: <FilesPage />,
  [RouteNames.traitList]: <TraitListPage />,
  [RouteNames.traitPage]: <TraitPage />,
  [RouteNames.traitItemPage]: <TraitItemPage />,
  [RouteNames.universityList]: <UniversityListPage />,
};

export const Routes: Route[] = convertRoutes([
  {
    pattern: "/not-found",
    name: RouteNames.notFound,
  },
  {
    pattern: "/",
    name: RouteNames.index,
  },
  {
    pattern: "/pages",
    name: RouteNames.pageList,
    onEnter: (root) => root.pageListPage.load(0),
  },
  {
    pattern: "/pages/new",
    name: RouteNames.newPage,
    onEnter: (root) => root.pageEditorPage.load(),
  },
  {
    pattern: "/pages/:id",
    name: RouteNames.editPage,
    onEnter: (root, to) => root.pageEditorPage.load(parseInt(to.params["id"])),
  },
  {
    pattern: "/files",
    name: RouteNames.fileList,
  },
  {
    pattern: "/traits",
    name: RouteNames.traitList,
    onEnter: (root) => root.traitListPage.load(),
  },
  {
    pattern: "/traits/:id",
    name: RouteNames.traitPage,
    onEnter: (root, to) => root.traitPage.load(to.params.id),
  },
  {
    pattern: "/traits/item/:id",
    name: RouteNames.traitItemPage,
    onEnter: (root, to) => root.traitItemPage.load(to.params.id),
  },
  {
    pattern: "/universities",
    name: RouteNames.universityList,
    onEnter: (root) => root.universityListPage.load(),
  },
]);
