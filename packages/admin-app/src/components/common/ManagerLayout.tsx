import React, { createContext, ReactComponentElement, ReactNode } from "react";
import { RouterLink, RouterView } from "mobx-state-router";
import { useRootStore } from "src/utils/rootStoreUtils";
import { ManagerRouteNames, ManagerRouteViewSettingsMap } from "../../pages/Manager/ManagerRoutes";
import { ManagerListDto } from "../../interfaces/ManagerRpc";
import { useObserver } from "mobx-react";

const linkClass =
  "block pl-10 py-4 lg:inline-block mt-4 text-teal-200 text-white transition transition-colors duration-300 ease-in-ou";

const Navbar = () => {
  const { loginStore: s, routerStore } = useRootStore();
  const activeLink = (name: string) => {
    return routerStore.getCurrentRoute().name === name ? "bg-red-300" : "bg-transparent	";
  };
  return useObserver(() => (
    <nav className="flex flex-col items-center h-screen w-full max-w-xs bg-blue-600 pt-8 pb-10 sticky top-0">
      <div className="flex items-center flex-shrink-0 text-white mb-6">
        <span className="font-semibold text-xl tracking-tight">Quartier Latin Manager</span>
      </div>
      <div className={`flex flex-col w-full`}>
        <RouterLink
          routeName={ManagerRouteNames.applicationList}
          className={`${linkClass} ${activeLink(ManagerRouteNames.applicationList)}`}
        >
          All Applications
        </RouterLink>
        <RouterLink
          routeName={ManagerRouteNames.findUserIdApplication}
          className={`${linkClass} ${activeLink(ManagerRouteNames.findUserIdApplication)}`}
        >
          User Applications
        </RouterLink>
      </div>
      <div className={`mt-10 px-10 w-full`}>
        <div className={`border-t pt-10 text-white`}>
          <RouterView routerStore={routerStore} viewMap={ManagerRouteViewSettingsMap} />
        </div>
      </div>
      <div className="flex items-center flex-shrink-0 text-white mt-auto">
        <button className="font-semibold text-xl tracking-tight" onClick={() => s.logOut()}>
          Logout
        </button>
      </div>
    </nav>
  ));
};

type Props = {
  children?: ReactComponentElement<any>;
};

export const SideSettings = createContext<SideSettingsDto | null>(null);

export type SideSettingsDto = {
  list: ManagerListDto;
  text: string;
};

const dataList: ManagerListDto = {
  page: 0,
  pageSize: 20,
  type: "",
  status: "",
  isAnswered: false,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const AdminLayout = ({ children }: Props) => {
  const SideSettingsValue = {
    list: dataList,
    text: "",
  };
  return useObserver(() => (
    <div className={`flex h-full`}>
      <SideSettings.Provider value={SideSettingsValue}>
        <Navbar />
        {children?.props()}
      </SideSettings.Provider>
    </div>
  ));
};

export default AdminLayout;
