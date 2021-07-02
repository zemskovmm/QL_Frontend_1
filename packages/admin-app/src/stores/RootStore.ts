import { observable } from "mobx";
import { RouterState, RouterStore } from "mobx-state-router";
import { Routes } from "src/routing/routes";
import { PageEditorPageStore } from "src/stores/pages/pageEditorPageStore";
import { PageListPageStore } from "src/stores/pages/pageListPageStore";
import { TraitListPageStore } from "./pages/trait/traitListPageStore";
import { TraitPageStore } from "./pages/trait/traitPageStore";
import { TraitItemPageStore } from "./pages/trait/traitItemPageStore";
import { UniversityListPageStore } from "./pages/university/universityListPageStore";
import { UniversityPageStore } from "./pages/university/universityPageStore";
import { UniversityCreatePageStore } from "./pages/university/universityCreatePageStore";

export class RootStore {
  @observable routerStore = new RouterStore(this, Routes, new RouterState("not-found"));
  @observable pageEditorPage = new PageEditorPageStore(this);
  @observable pageListPage = new PageListPageStore();
  @observable traitListPage = new TraitListPageStore(this);
  @observable traitPage = new TraitPageStore(this);
  @observable traitItemPage = new TraitItemPageStore(this);
  @observable universityListPage = new UniversityListPageStore(this);
  @observable universityPage = new UniversityPageStore(this);
  @observable universityCreatePage = new UniversityCreatePageStore(this);
}
