import { observable } from "mobx";
import { RouterState, RouterStore } from "mobx-state-router";
import { Routes } from "src/routing/routes";
import { PageEditorStore } from "src/components/pageEditor/PageEditorStore";
import { PageEditorPageStore } from "src/stores/pages/pageEditorPageStore";
import { PageListPageStore } from "src/stores/pages/pageListPageStore";
import { TraitListPageStore } from "./pages/trait/traitListPageStore";
import { TraitPageStore } from "./pages/trait/traitPageStore";
import { TraitItemPageStore } from "./pages/trait/traitItemPageStore";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable pageEditorPage = new PageEditorPageStore(this);
  @observable pageListPage = new PageListPageStore();
  @observable traitListPage = new TraitListPageStore(this);
  @observable traitPage = new TraitPageStore(this);
  @observable traitItemPage = new TraitItemPageStore(this);
}
