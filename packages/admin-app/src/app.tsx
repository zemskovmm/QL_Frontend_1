import React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import { observer, Provider } from "mobx-react";
import { RootStore } from "src/stores/RootStore";
import { HistoryAdapter } from "mobx-state-router";
import "mobx-react-lite/batchingForReactDom";
import "src/styles/global.css";
import "src/styles/legacy.css";
import { AdminShell } from "./components/AdminShell/AdminShell";
import { AnonShell } from "./components/AnonShell/AdminShell";
import { ManagerShell } from "./components/MangerShell/ManagerShell";

let root: RootStore;

const ensureInitialized = () => {
  if (root) return;
  root = new RootStore();
  const historyAdapter = new HistoryAdapter(root.routerStore, createBrowserHistory());
  historyAdapter.observeRouterStateChanges();
};

export const App = observer(() => {
  ensureInitialized();
  const route = root.routerStore.routerState.routeName;
  return (
    <Provider rootStore={root}>
      {route.startsWith("admin-") ? <AdminShell /> : route.startsWith("manager-") ? <ManagerShell /> : <AnonShell />}
    </Provider>
  );
});
