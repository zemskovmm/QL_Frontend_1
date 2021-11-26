import React, { ReactNode } from "react";
import { RouterLink } from "mobx-state-router";
import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";

const Navbar = () => {
  const { loginStore: s } = useRootStore();
  return (
    <nav className="flex items-center justify-between w-full bg-blue-600 p-4">
      <div className="flex items-center flex-shrink-0 text-white mr-4">
        <span className="font-semibold text-xl tracking-tight">Quartier Latin Manager</span>
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
