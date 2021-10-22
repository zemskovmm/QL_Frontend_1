import { RequestTracking } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "../../../clients/adminApiClient";
import { RouteNames } from "../../../routing/routes";

export class LoginStore extends RequestTracking {
  @observable username: string = "";
  @observable password: string = "";
  @observable rememberMe: boolean = true;

  constructor(public rootStore: RootStore) {
    super();
  }

  async logIn() {
    const data = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    };
    try {
      await AdminApi.postLogin(data);
      await this.rootStore.routerStore.goTo(RouteNames.pageList);
    } catch (e) {
      alert(e);
    }
  }

  async logOut() {
    try {
      const req = await AdminApi.getLogout();
      await this.rootStore.routerStore.goTo(RouteNames.index);
    } catch (e) {
      alert(e);
    }
  }
}
