import { RequestTracking } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "../../../clients/adminApiClient";

export class LoginStore extends RequestTracking {
  @observable username: string = "";
  @observable password: string = "";
  @observable rememberMe: boolean = true;

  constructor(public rootStore: RootStore) {
    super();
  }

  async save() {
    const data = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    };
    try {
      await AdminApi.postLogin(data);
    } catch (e) {
      alert(e);
    }
  }
}
