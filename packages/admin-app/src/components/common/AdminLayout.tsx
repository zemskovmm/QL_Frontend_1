import React, { ReactNode } from "react";
import { RouterLink } from "mobx-state-router";
import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

const Navbar = () => {
  const { loginStore: s } = useRootStore();
  return (
    <nav className="flex items-center justify-between w-full bg-blue-600 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-4">
        <span className="font-semibold text-xl tracking-tight">Quartier Latin Admin</span>
      </div>
      <div className=" block lg:flex lg:items-center mx-auto">
        <div className="text-sm flex lg:flex-grow font-bold text-white flex-nowrap	">
          <RouterLink routeName={AdminRouteNames.pageList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Pages</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.fileList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Files</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.traitList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Traits</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.universityList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Universities</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.schoolList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Schools</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.courseList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Coures</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.housingList}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Housings</a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.globalSettingsEditor} params={{ lang: "en" }}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10 whitespace-nowrap	">
              Global settings
            </a>
          </RouterLink>
          <RouterLink routeName={AdminRouteNames.mangerCreate}>
            <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10 whitespace-nowrap	">
              Create Manager
            </a>
          </RouterLink>
        </div>
      </div>
      <div className="flex items-center flex-shrink-0 text-white mr-4">
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

const AdminLayout = ({ children }: Props) => (
  <div>
    <header>
      <Navbar />
    </header>
    {children}
  </div>
);

export default AdminLayout;
