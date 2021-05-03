import { action, computed, observable } from "mobx";
import { RouterState, RouterStore } from "mobx-state-router";
import {Routes} from "src/routing/routes";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
}
