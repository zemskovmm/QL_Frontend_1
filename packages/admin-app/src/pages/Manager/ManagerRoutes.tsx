import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";
import { UserAuthorizedOnlyHook } from "../Admin/AdminRoutes";
import { ApplicationList } from "./applicationList/ApplicationList";
import { ApplicationListSide } from "../../components/MangerShell/sideMenuSettings/applicationListSide";
import { ApplicationPage } from "./application/Application";

export enum ManagerRouteNames {
  applicationList = "manager-applicationList",
  applicationId = "manager-applicationId",
  applicationIdChat = "manager-applicationIdChat",
  findUserIdApplication = "manager-findUserIdApplication",
}

export const ManagerRouteViewMap = {
  [ManagerRouteNames.applicationList]: <ApplicationList />,
  [ManagerRouteNames.findUserIdApplication]: <div />,
  [ManagerRouteNames.applicationId]: <ApplicationPage />,
};

export const ManagerRouteViewSettingsMap = {
  [ManagerRouteNames.applicationList]: <ApplicationListSide />,
  [ManagerRouteNames.findUserIdApplication]: <div />,
  [ManagerRouteNames.applicationId]: <div />,
};

export const ManagerRoutes: Route[] = convertRoutes([
  {
    pattern: "/manager/application-list",
    name: ManagerRouteNames.applicationList,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root) => root.mangerApplicationListPage.load(),
  },
  {
    pattern: "/manager/application-list-user",
    name: ManagerRouteNames.findUserIdApplication,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/manager/application-user/:userId/:applicationId",
    name: ManagerRouteNames.applicationId,
    hooks: [UserAuthorizedOnlyHook],
    onEnter: (root, to) => root.mangerApplicationPage.load(to.params["applicationId"]),
  },
]);
