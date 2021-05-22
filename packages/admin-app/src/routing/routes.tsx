import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "./route";
import { IndexPage } from "src/pages/indexPage";
import { PageEditorPage } from "src/pages/pageEditorPage";
import {PageListPage} from "src/pages/pageListPage";
import {FilesPage} from "src/pages/filesPage";

export enum RouteNames {
  notFound = "not-found",
  index = "index",
  pageList = "pageList",
  editPage = "editPage",
  newPage = "newPage",
  fileList = "fileList",
  fileListById = "fileListById",
}

export const RouteViewMap = {
  [RouteNames.notFound]: <div>404 - not found</div>,
  [RouteNames.index]: <IndexPage />,
  [RouteNames.newPage]: <PageEditorPage />,
  [RouteNames.editPage]: <PageEditorPage />,
  [RouteNames.pageList]: <PageListPage />,
  [RouteNames.fileList]: <FilesPage />,
  [RouteNames.fileListById]: <FilesPage />
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
    onEnter: root => root.pageListPage.load(0)
  },
  {
    pattern: "/pages/new",
    name: RouteNames.newPage,
    onEnter: (root) => root.pageEditorPage.load(),
  },
  {
    pattern: "/pages/:id",
    name: RouteNames.editPage,
    onEnter: (root, to) => root.pageEditorPage.load(parseInt(to.params['id'])),
  },
  {
    pattern: "/files",
    name: RouteNames.fileList,
    onEnter: root => root.filesStore.load()
  },
  {
    pattern: "/files/:id",
    name: RouteNames.fileListById,
    onEnter: (root, to) => root.filesStore.load(parseInt(to.params['id'])),
  },
]);
