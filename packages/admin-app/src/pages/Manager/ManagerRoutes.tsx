import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";

export enum RouteNames {}

export const ManagerRouteViewMap = {
  // [RouteNames.newPage]: <PageEditorPage />,
};

export const ManagerRoutes: Route[] = convertRoutes([]);
