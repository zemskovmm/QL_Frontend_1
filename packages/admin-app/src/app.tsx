import React from "react";
import createBrowserHistory from "history/createBrowserHistory";
import { observer, Provider } from "mobx-react";
import { RootStore } from "src/stores/RootStore";
import {HistoryAdapter, RouterView} from "mobx-state-router";
import "mobx-react-lite/batchingForReactDom";
import {RouteViewMap} from "src/routing/routes";
import 'src/styles/global.css'

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
          <RouterView routerStore={root.routerStore} viewMap={RouteViewMap}/>
        </Provider>
    );
});
