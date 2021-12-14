import { RequestTracking } from "src/utils/Loadable";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { AdminApi } from "src/clients/adminApiClient";
import { RouteNames } from "src/routing/routes";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { ManagerRouteNames } from "../../../pages/Manager/ManagerRoutes";

export class LoginStore extends RequestTracking {
  @observable username: string = "";
  @observable password: string = "";
  @observable rememberMe: boolean = true;
  @observable role: string = "";

  constructor(public rootStore: RootStore) {
    super();
  }

  @action reset() {
    this.username = "";
    this.password = "";
    this.rememberMe = true;
    this.role = "";
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
      const res = await AdminApi.getRole();
      this.role = res[0] ?? "";
      if (this.role === "Manager") await this.rootStore.routerStore.goTo(ManagerRouteNames.applicationList);
      if (this.role === "Admin") await this.rootStore.routerStore.goTo(AdminRouteNames.pageList);
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
      if (!this.role) {
        const res = await AdminApi.getRole();
        this.role = res[0] ?? "";
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
