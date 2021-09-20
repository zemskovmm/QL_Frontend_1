import React, { ReactNode } from "react";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";

const Navbar = () => (
  <nav className="flex items-center justify-between w-full bg-blue-600 p-4">
    <div className="flex items-center flex-shrink-0 text-white mr-4">
      <span className="font-semibold text-xl tracking-tight">Quartier Latin Admin</span>
    </div>
    <div className=" block lg:flex lg:items-center mx-auto">
      <div className="text-sm flex lg:flex-grow font-bold text-white flex-nowrap	">
        <RouterLink routeName={RouteNames.pageList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Pages</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.fileList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Files</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.traitList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Traits</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.universityList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Universities</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.schoolList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Schools</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.courseList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10">Coures</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "en" }}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mx-10 whitespace-nowrap	">
            Global settings
          </a>
        </RouterLink>
      </div>
    </div>
    <div className="flex items-center flex-shrink-0 text-white mr-4">
      <span className="font-semibold text-xl tracking-tight">Quartier Latin Admin</span>
    </div>
  </nav>
);

type Props = {
  children?: ReactNode;
  title?: string;
};

const AdminLayout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <header>
      <Navbar />
    </header>
    {children}
  </div>
);

export default AdminLayout;
