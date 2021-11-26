import { RequestTracking } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "src/clients/adminApiClient";
import { RouteNames } from "src/routing/routes";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

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
      await this.rootStore.routerStore.goTo(AdminRouteNames.pageList);
    } catch (e) {
      alert(e);
    }
  }

  @action async logOut() {
    try {
      await AdminApi.getLogout();
      await this.rootStore.routerStore.goTo(RouteNames.index);
    } catch (e) {
      alert(e);
    }
  }

  @action async check() {
    try {
      await AdminApi.getCheck();
      return true;
    } catch (e) {
      return false;
    }
  }
}
