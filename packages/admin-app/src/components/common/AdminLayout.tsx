import React, { ReactNode } from "react";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";

const Navbar = () => (
  <nav className="flex items-center justify-between flex-wrap bg-blue-600 p-4">
    <div className="flex items-center flex-shrink-0 text-white mr-4">
      <span className="font-semibold text-xl tracking-tight">Quartier Latin Admin</span>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        <RouterLink routeName={RouteNames.pageList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Pages</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.fileList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Files</a>
        </RouterLink>
        <RouterLink routeName={RouteNames.traitList}>
          <a className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Traits</a>
        </RouterLink>
      </div>
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
