import {observable} from "mobx";
import {RouterState, RouterStore} from "mobx-state-router";
import {Routes} from "src/routing/routes";
import {PageEditorStore} from "src/components/pageEditor/PageEditorStore";
import {PageEditorPageStore} from "src/stores/pages/pageEditorPageStore";
import {PageListPageStore} from "src/stores/pages/pageListPageStore";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable pageEditorPage = new PageEditorPageStore(this);
  @observable pageListPage = new PageListPageStore();
}
