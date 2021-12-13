import { RootStore } from "../stores/RootStore";
import { RouterState } from "mobx-state-router";
import { AdminRouteNames } from "../pages/Admin/AdminRoutes";
import { ManagerRouteNames } from "../pages/Manager/ManagerRoutes";

export interface RouteTransitionHook {
  (root: RootStore, next: () => Promise<void>, to: RouterState, from: RouterState): Promise<void> | void;
}

export const UserAuthorizedHook: RouteTransitionHook = async (root) => {
  if ((await root.loginStore.check()) && root.loginStore.role)
    throw new RouterState(
      root.loginStore.role === "Manager" ? ManagerRouteNames.applicationList : AdminRouteNames.pageList
    );
};
