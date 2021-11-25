import { RootStore } from "../stores/RootStore";
import { RouterState } from "mobx-state-router";
import { AdminRouteNames } from "../pages/Admin/AdminRoutes";

export interface RouteTransitionHook {
  (root: RootStore, next: () => Promise<void>, to: RouterState, from: RouterState): Promise<void> | void;
}

export const UserAuthorizedHook: RouteTransitionHook = async (root) => {
  if (await root.loginStore.check()) throw new RouterState(AdminRouteNames.pageList);
};
