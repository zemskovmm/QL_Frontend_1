import React from "react";
import { RouterView } from "mobx-state-router";
import "mobx-react-lite/batchingForReactDom";
import "src/styles/global.css";
import "src/styles/legacy.css";
import { LoadingIf } from "src/components/common/Loading";
import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import { AnonRouteViewMap } from "../../routing/routes";
import { NotFoundPage } from "../../pages/NotFounds/NotFoundPage";

export const AnonShell = () => {
  const { routerStore } = useRootStore();
  return useObserver(() => (
    <LoadingIf isLoading={routerStore.isTransitioning}>
      <RouterView routerStore={routerStore} viewMap={AnonRouteViewMap} />
    </LoadingIf>
  ));
};
