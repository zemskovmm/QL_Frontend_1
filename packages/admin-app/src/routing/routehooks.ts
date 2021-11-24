import { RootStore } from "../stores/RootStore";
import { RouterState } from "mobx-state-router";
import { RouteNames } from "./routes";

export interface RouteTransitionHook {
  (root: RootStore, next: () => Promise<void>, to: RouterState, from: RouterState): Promise<void> | void;
}

export const UserAuthorizedOnlyHook: RouteTransitionHook = async (root) => {
  if (!(await root.loginStore.check())) throw new RouterState(RouteNames.index);
};

export const UserAuthorizedHook: RouteTransitionHook = async (root) => {
  if (await root.loginStore.check()) throw new RouterState(RouteNames.pageList);
};
