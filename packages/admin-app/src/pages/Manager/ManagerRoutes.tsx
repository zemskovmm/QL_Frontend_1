import React from "react";
import { Route } from "mobx-state-router";
import { convertRoutes } from "src/routing/route";

export enum RouteNames {}

export const AdminRouteViewMap = {
  // [RouteNames.newPage]: <PageEditorPage />,
};

export const AdminRoutes: Route[] = convertRoutes([]);
