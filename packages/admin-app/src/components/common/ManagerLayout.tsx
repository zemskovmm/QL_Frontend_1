import React, { createContext, ReactNode } from "react";
import { RouterLink, RouterView } from "mobx-state-router";
import { useRootStore } from "src/utils/rootStoreUtils";
import { ManagerRouteNames, ManagerRouteViewSettingsMap } from "../../pages/Manager/ManagerRoutes";

const linkClass =
  "block pl-10 py-4 lg:inline-block mt-4 text-teal-200 text-white transition transition-colors duration-300 ease-in-ou";

const Navbar = () => {
  const { loginStore: s, routerStore } = useRootStore();
  const activeLink = (name: string) => {
    return routerStore.getCurrentRoute().name === name ? "bg-red-300" : "bg-transparent	";
  };
  return (
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
      <div className={`mt-10`}>
        <RouterView routerStore={routerStore} viewMap={ManagerRouteViewSettingsMap} />
      </div>
      <div className="flex items-center flex-shrink-0 text-white mt-auto">
        <button className="font-semibold text-xl tracking-tight" onClick={() => s.logOut()}>
          Logout
        </button>
      </div>
    </nav>
  );
};

type Props = {
  children?: ReactNode;
};

export const sideSettings = createContext(null);

const AdminLayout = ({ children }: Props) => (
  <div className={`flex h-full`}>
    <Navbar />
    {children}
  </div>
);

export default AdminLayout;
