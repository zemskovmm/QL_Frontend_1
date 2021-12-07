import React, { FC } from "react";
import { RouterLink, RouterView } from "mobx-state-router";
import { useRootStore } from "src/utils/rootStoreUtils";
import { ManagerRouteNames, ManagerRouteViewSettingsMap } from "../../pages/Manager/ManagerRoutes";
import { useObserver } from "mobx-react";

const linkClass =
  "block pl-10 py-4 lg:inline-block mt-4 text-teal-200 text-white transition transition-colors duration-300 ease-in-ou";

const Navbar = () => {
  const { loginStore: s, routerStore } = useRootStore();
  const activeLink = (name: string) => {
    return routerStore.getCurrentRoute().name === name ? "bg-blue-400" : "bg-transparent	";
  };
  return useObserver(() => (
    <nav className="flex flex-col items-center h-screen w-full max-w-xs bg-blue-600 pt-8 pb-10 sticky top-0 overflow-y-scroll customScrollNav">
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
      <div className={`my-10 px-10 w-full`}>
        <div className={`border-t pt-5 text-white`}>
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

const AdminLayout: FC = ({ children }) => {
  return useObserver(() => (
    <div className={`flex h-full`}>
      <Navbar />
      {children}
    </div>
  ));
};

export default AdminLayout;
