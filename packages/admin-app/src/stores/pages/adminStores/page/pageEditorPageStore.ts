import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { observable } from "mobx";
import { PageEditorStore } from "src/components/pageEditor/PageEditorStore";
import { RootStore } from "src/stores/RootStore";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

export class PageEditorPageStore extends RequestTracking {
  @observable editor?: PageEditorStore;
  constructor(public rootStore: RootStore) {
    super();
  }
  async load(id?: number) {
    if (this.editor != null && this.editor.id == id) return;
    if (id)
      this.editor = new PageEditorStore(
        () => {
          alert("Saved");
        },
        id,
        await AdminApi.getPageById(id)
      );
    else
      this.editor = new PageEditorStore(
        (savedId) => {
          this.rootStore.routerStore.goTo(AdminRouteNames.editPage, { id: savedId.toString() });
          alert("Created");
        },
        null,
        null
      );
  }
}
