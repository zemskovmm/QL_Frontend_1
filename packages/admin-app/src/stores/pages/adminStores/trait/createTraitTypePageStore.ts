import { Loadable } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { RemoteUiEditorStore } from "@kekekeks/remoteui/src";
import { AdminApi } from "src/clients/adminApiClient";
import { LanguageDictionaryCustomize } from "src/components/remoteui/AdminLanguageDictionaryEditor";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { entityType } from "src/interfaces/TraitPageDto";
import { findIndex, remove } from "lodash";

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
  @observable entityTypes: entityType[] = [];

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  checkedOrNot(name: string) {
    return findIndex(this.entityTypes, ["entityTypeName", name]) !== -1;
  }

  @action changeEntity(name: string, id: number) {
    const index = findIndex(this.entityTypes, ["entityTypeName", name]);
    if (index !== -1) {
      remove(this.entityTypes, function (o) {
        return o.entityTypeName === name;
      });
    } else {
      this.entityTypes = [...this.entityTypes, { entityTypeName: name, entityTypeId: id }];
    }
  }

  @action async load() {
    const def = await AdminApi.definitionTraitType();
    const data = await AdminApi.getTraitType(Number(this.traitTypeId));
    this.entityTypes = data.entityTypes ?? [];
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
    const data = {
      ...value,
      identifier: unWhiteSpaceIdentifier,
      names: unmapNames,
      entityTypes: this.entityTypes,
    };
    await this.track(() => AdminApi.updateTraitType(Number(this.traitTypeId), data));
    await this.root.routerStore.goTo(AdminRouteNames.traitPage, { id: this.traitTypeId });
  }
}
