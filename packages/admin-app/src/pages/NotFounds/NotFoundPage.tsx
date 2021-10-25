import React from "react";
import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import styles from "./NotFoundPage.module.css";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routing/routes";

export const NotFoundPage = () => {
  return useObserver(() => (
    <div className={`h-screen	flex`} style={{ backgroundColor: `#182023` }}>
      <div className={`w-4/12 m-auto ${styles.loginBoard}`}>
        <div className={`mb-10`}>404 - not found</div>
        <RouterLink
          routeName={RouteNames.index}
          className={`text-white font-bold py-2 px-4 rounded inline-block bg-gray-500 hover:bg-gray-100 hover:text-black`}
        >
          Go back
        </RouterLink>
      </div>
    </div>
  ));
};
