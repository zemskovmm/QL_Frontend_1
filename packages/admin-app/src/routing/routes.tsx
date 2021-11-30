import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "./route";
import { IndexPage } from "src/pages/LoginPage/indexPage";
import { UserAuthorizedHook } from "./routehooks";
import { NotFoundPage } from "src/pages/NotFounds/NotFoundPage";
import { AdminRoutes } from "src/pages/Admin/AdminRoutes";
import { ManagerRoutes } from "../pages/Manager/ManagerRoutes";

export enum RouteNames {
  notFound = "not-found",
  index = "index",
}

export const AnonRouteViewMap = {
  [RouteNames.notFound]: <NotFoundPage />,
  [RouteNames.index]: <IndexPage />,
};

export const AnonRoutes: Route[] = convertRoutes([
  {
    pattern: "/not-found",
    name: RouteNames.notFound,
  },
  {
    pattern: "/",
    name: RouteNames.index,
    hooks: [UserAuthorizedHook],
    onEnter: (root) => root.loginStore.reset(),
  },
]);

export const Routes: Route[] = AnonRoutes.concat(AdminRoutes).concat(ManagerRoutes);
