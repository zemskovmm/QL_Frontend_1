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

  @action reset() {
    this.username = "";
    this.password = "";
    this.rememberMe = true;
  }

  @action async logIn() {
    const data = {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    };
    try {
      await AdminApi.postLogin(data);
      this.reset();
      await this.rootStore.routerStore.goTo(RouteNames.pageList);
    } catch (e) {
      alert(e);
    }
  }

  @action async logOut() {
    try {
      const req = await AdminApi.getLogout();
      await this.rootStore.routerStore.goTo(RouteNames.index);
    } catch (e) {
      await this.rootStore.routerStore.goTo(RouteNames.index);
    }
  }

  @action async check() {
    try {
      const req = await AdminApi.getCheck();
      return true;
    } catch (e) {
      return false;
    }
  }
}
