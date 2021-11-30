import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";
import { UserAuthorizedOnlyHook } from "../Admin/AdminRoutes";
import { ApplicationList } from "./appllicationList/ApplicationList";
import { ApplicationListSide } from "../../components/MangerShell/sideMenuSettings/applicationListSide";

export enum ManagerRouteNames {
  applicationList = "manager-applicationList",
  applicationId = "manager-applicationId",
  applicationIdChat = "manager-applicationIdChat",
  findUserIdApplication = "manager-findUserIdApplication",
}

export const ManagerRouteViewMap = {
  [ManagerRouteNames.applicationList]: <ApplicationList />,
  [ManagerRouteNames.findUserIdApplication]: <div />,
};

export const ManagerRouteViewSettingsMap = {
  [ManagerRouteNames.applicationList]: <ApplicationListSide />,
  [ManagerRouteNames.findUserIdApplication]: <div />,
};

export const ManagerRoutes: Route[] = convertRoutes([
  {
    pattern: "/manager/application-list",
    name: ManagerRouteNames.applicationList,
    hooks: [UserAuthorizedOnlyHook],
  },
  {
    pattern: "/manager/application-user",
    name: ManagerRouteNames.findUserIdApplication,
    hooks: [UserAuthorizedOnlyHook],
  },
]);
