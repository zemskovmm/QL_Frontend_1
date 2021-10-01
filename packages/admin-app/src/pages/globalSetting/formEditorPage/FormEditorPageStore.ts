import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { observable } from "mobx";
import { FormEditorStore } from "./Editor/FormEditorStore";
import { RootStore } from "src/stores/RootStore";
import { RouteNames } from "src/routing/routes";

export class FormEditorPageStore extends RequestTracking {
  @observable editor?: FormEditorStore;
  constructor(public rootStore: RootStore) {
    super();
  }
  async load(lang: string, type: string) {
    const req = await AdminApi.getGlobalSettings(lang);
    // const model = req?.personalCabinet[type] ?? [];
    // if (this.editor != null && this.editor.id == id) return;
    // if (model)
    //   this.editor = new FormEditorStore(
    //     () => {
    //       alert("Saved");
    //     },
    //     null,
    //     null
    //   );
    // else
    this.editor = new FormEditorStore(
      (savedId) => {
        this.rootStore.routerStore.goTo(RouteNames.editPage, { id: savedId.toString() });
        alert("Created");
      },
      null,
      null
    );
  }
}
