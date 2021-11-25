import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { observable } from "mobx";
import { FormEditorStore } from "./Editor/FormEditorStore";
import { RootStore } from "src/stores/RootStore";

export class FormEditorPageStore extends RequestTracking {
  @observable editor?: FormEditorStore;
  constructor(public rootStore: RootStore) {
    super();
  }
  async load(lang: string, type: string) {
    const req = await AdminApi.getGlobalSettings(lang);
    const cabinet = req.personalCabinet ?? null;
    const model = cabinet ? cabinet[type] : null;
    if (model) {
      this.editor = new FormEditorStore(() => console.log(), type, model, lang, req);
    } else {
      this.editor = new FormEditorStore(() => console.log(), type, null, lang, req);
    }
  }
}
