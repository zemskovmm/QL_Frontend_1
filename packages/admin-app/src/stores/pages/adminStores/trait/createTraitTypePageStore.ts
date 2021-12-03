import { Loadable } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { AdminApi } from "src/clients/adminApiClient";
import { LanguageDictionaryCustomize } from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

export class CreateTraitTypePageStore extends Loadable {
  @observable root: RootStore;
  @observable remoteUi?: RemoteUiEditorStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @action async load() {
    const def = await AdminApi.definitionTraitType();
    this.remoteUi = new RemoteUiEditorStore(def, {}, new LanguageDictionaryCustomize({ en: {} }));
  }

  @action async save() {
    const value = (await this.remoteUi?.getDataAsync()) as any;
    if (!value) return;
    const unmapNames = Object.keys(value.names).reduce((acc, x) => ({ ...acc, [x]: value.names[x].name }), {});
    await this.track(() => AdminApi.createTraitType({ ...value, names: unmapNames }));
    await this.root.routerStore.goTo(AdminRouteNames.traitList);
  }
}

export class EditTraitTypePageStore extends Loadable {
  @observable root: RootStore;
  @observable traitTypeId = "0";
  @observable remoteUi?: RemoteUiEditorStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @action async load() {
    const def = await AdminApi.definitionTraitType();
    const data = await AdminApi.getTraitType(Number(this.traitTypeId));
    const mappedNames = Object.keys(data.names).reduce((acc, x) => ({ ...acc, [x]: { name: data.names[x] } }), {});
    this.remoteUi = new RemoteUiEditorStore(
      def,
      { ...data, names: mappedNames },
      new LanguageDictionaryCustomize(mappedNames)
    );
  }

  @action async save() {
    const value = (await this.remoteUi?.getDataAsync()) as any;
    if (!value) return;
    const unmapNames = Object.keys(value.names).reduce((acc, x) => ({ ...acc, [x]: value.names[x].name }), {});
    const unWhiteSpaceIdentifier = value.identifier.replace(/\s/g, "");
    await this.track(() =>
      AdminApi.updateTraitType(Number(this.traitTypeId), {
        ...value,
        identifier: unWhiteSpaceIdentifier,
        names: unmapNames,
      })
    );
    await this.root.routerStore.goTo(AdminRouteNames.traitPage, { id: this.traitTypeId });
  }
}
