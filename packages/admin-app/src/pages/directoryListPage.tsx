import { useRootStore } from "../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { RouteNames } from "../routing/routes";
import React from "react";
import { PaginatedTable } from "../components/PaginatedTable/PaginatedTable";

export const DirectoryListPage = () => {
  const s = useRootStore().directoryListPage;
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <PaginatedTable store={s} editPagePath={RouteNames.directoryList} detailPagePath={RouteNames.directoryList} />
        </div>
      </div>
    </div>
  ));
};
