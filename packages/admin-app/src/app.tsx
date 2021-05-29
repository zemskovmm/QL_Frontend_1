import React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import { observer, Provider } from "mobx-react";
import { RootStore } from "src/stores/RootStore";
import { HistoryAdapter, RouterView } from "mobx-state-router";
import "mobx-react-lite/batchingForReactDom";
import { RouteViewMap } from "src/routing/routes";
import "src/styles/global.css";
//import "react-draft-wysi2wyg/dist/react-draft-wysiwyg.css"
import { LoadingIf } from "src/components/common/Loading";
import AdminLayout from "src/components/common/AdminLayout";

let root: RootStore;

const ensureInitialized = () => {
  if (root) return;
  root = new RootStore();
  const historyAdapter = new HistoryAdapter(root.routerStore, createBrowserHistory());
  historyAdapter.observeRouterStateChanges();
};

export const App = observer(() => {
  ensureInitialized();
  return (
    <Provider rootStore={root}>
      <AdminLayout>
        <LoadingIf isLoading={root.routerStore.isTransitioning}>
          <RouterView routerStore={root.routerStore} viewMap={RouteViewMap} />
        </LoadingIf>
      </AdminLayout>
    </Provider>
  );
});
