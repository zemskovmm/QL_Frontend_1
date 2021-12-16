import React from "react";
import { Route, RouterState } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";
import { ApplicationList } from "./applicationList/ApplicationList";
import { ApplicationListSide } from "../../components/MangerShell/sideMenuSettings/applicationListSide";
import { ApplicationPage } from "./application/Application";
import { ApplicationSide } from "../../components/MangerShell/sideMenuSettings/applicationSide";
import { RouteTransitionHook } from "../../routing/routehooks";
import { RouteNames } from "../../routing/routes";

export const ManagerAuthorizedOnlyHook: RouteTransitionHook = async (root) => {
  if (!(await root.loginStore.check()) || !(root.loginStore.role === "Manager"))
    throw new RouterState(RouteNames.index);
};

export enum ManagerRouteNames {
  applicationList = "manager-applicationList",
  applicationListNew = "manager-applicationList-New",
  applicationId = "manager-applicationId",
  applicationIdChat = "manager-applicationIdChat",
  findUserIdApplication = "manager-findUserIdApplication",
}

export const ManagerRouteViewMap = {
  [ManagerRouteNames.applicationList]: <ApplicationList />,
  [ManagerRouteNames.applicationListNew]: <ApplicationList />,
  [ManagerRouteNames.findUserIdApplication]: <div />,
  [ManagerRouteNames.applicationId]: <ApplicationPage />,
};

export const ManagerRouteViewSettingsMap = {
  [ManagerRouteNames.applicationList]: <ApplicationListSide />,
  [ManagerRouteNames.applicationListNew]: <ApplicationListSide />,
  [ManagerRouteNames.findUserIdApplication]: <div />,
  [ManagerRouteNames.applicationId]: <ApplicationSide />,
};

export const ManagerRoutes: Route[] = convertRoutes([
  {
    pattern: "/manager/application-list",
    name: ManagerRouteNames.applicationList,
    hooks: [ManagerAuthorizedOnlyHook],
    onEnter: async (root) => await root.mangerApplicationListPage.load(),
  },
  {
    pattern: "/manager/application-list/actual",
    name: ManagerRouteNames.applicationListNew,
    hooks: [ManagerAuthorizedOnlyHook],
    onEnter: async (root) => await root.mangerApplicationListPage.load(true),
  },
  {
    pattern: "/manager/application-list-user",
    name: ManagerRouteNames.findUserIdApplication,
    hooks: [ManagerAuthorizedOnlyHook],
  },
  {
    pattern: "/manager/application-user/:userId/:applicationId",
    name: ManagerRouteNames.applicationId,
    hooks: [ManagerAuthorizedOnlyHook],
    onEnter: async (root, to) => await root.mangerApplicationPage.load(to.params["applicationId"]),
  },
]);
