import React from "react";
import { RouterView } from "mobx-state-router";
import "mobx-react-lite/batchingForReactDom";
import "src/styles/global.css";
import "src/styles/legacy.css";
import { LoadingIf } from "src/components/common/Loading";
import AdminLayout from "src/components/common/AdminLayout";
import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import { AdminRouteViewMap } from "src/pages/Admin/AdminRoutes";

export const AdminShell = () => {
  const { routerStore } = useRootStore();
  return useObserver(() => (
    <AdminLayout>
      <LoadingIf isLoading={routerStore.isTransitioning}>
        <RouterView routerStore={routerStore} viewMap={AdminRouteViewMap} />
      </LoadingIf>
    </AdminLayout>
  ));
};
