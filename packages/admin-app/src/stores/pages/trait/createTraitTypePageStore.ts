import { Loadable } from "../../../utils/Loadable";
import { observable } from "mobx";
import { RootStore } from "../../RootStore";

export class CreateTraitTypePageStore extends Loadable {
  @observable root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  load(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
