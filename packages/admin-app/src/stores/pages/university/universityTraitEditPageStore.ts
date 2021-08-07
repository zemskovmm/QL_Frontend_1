import { TraitEditorStore, TraitLoaderWithCache } from "../../../components/traitEditor";
import { action, observable } from "mobx";
import { RootStore } from "../../RootStore";
import { AdminApi } from "../../../clients/adminApiClient";

export class UniversityTraitLoader extends TraitLoaderWithCache {
  @observable universityId = 0;

  @action async setUniversityId(id: number) {
    this.universityId = id;
    await this.reload();
  }

  async addTraitToItem(traitId: number) {
    await AdminApi.addTraitToUniversity(this.universityId, traitId);
  }

  async deleteTraitToItem(traitId: number) {
    await AdminApi.removeTraitFromUniversity(this.universityId, traitId);
  }

  async loadActiveTraits() {
    return await AdminApi.getActiveUniversityTraits(this.universityId);
  }
}

export class UniversityTraitEditPageStore {
  @observable root: RootStore;
  @observable traitStore: TraitEditorStore<UniversityTraitLoader>;

  constructor(public rootStore: RootStore) {
    this.root = rootStore;
    this.traitStore = new TraitEditorStore(new UniversityTraitLoader());
  }

  @action async loadStore(id: number) {
    this.traitStore.page = 0;
    await this.traitStore.traitLoader.setUniversityId(id);
    await this.traitStore.refresh({});
  }
}
