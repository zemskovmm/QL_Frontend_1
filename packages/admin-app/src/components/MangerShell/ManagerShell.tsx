import React from "react";
import { RouterView } from "mobx-state-router";
import "mobx-react-lite/batchingForReactDom";
import "src/styles/global.css";
import "src/styles/legacy.css";
import { LoadingIf } from "src/components/common/Loading";
import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import { AdminRouteViewMap } from "src/pages/Admin/AdminRoutes";
import ManagerLayout from "../common/ManagerLayout";

export const ManagerShell = () => {
  const { routerStore } = useRootStore();
  return useObserver(() => (
    <ManagerLayout>
      <LoadingIf isLoading={routerStore.isTransitioning}>
        <RouterView routerStore={routerStore} viewMap={} />
      </LoadingIf>
    </ManagerLayout>
  ));
};
