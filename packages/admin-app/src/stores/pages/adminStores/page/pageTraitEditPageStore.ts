import { TraitEditorStore, TraitLoaderWithCache } from "src/components/traitEditor";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "src/clients/adminApiClient";

export class PageTraitLoader extends TraitLoaderWithCache {
  @observable pageId = 0;

  @action async setPageId(id: number) {
    this.pageId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToPage(this.pageId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromPage(this.pageId, traitId);
  }

  async loadActiveTraits() {
    return await AdminApi.getActivePageTraits(this.pageId);
  }
}

export class PageTraitEditPageStore {
  @observable root: RootStore;
  @observable traitStore: TraitEditorStore<PageTraitLoader>;

  constructor(public rootStore: RootStore) {
    this.root = rootStore;
    this.traitStore = new TraitEditorStore(new PageTraitLoader());
  }

  @action async loadStore(id: number) {
    this.traitStore.page = 0;
    await this.traitStore.traitLoader.setPageId(id);
    await this.traitStore.refresh({});
  }
}
