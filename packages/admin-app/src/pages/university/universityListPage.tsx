import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { RouteNames } from "src/routing/routes";
import React from "react";
import { AdminTable } from "src/components/common/AdminTable";
import { AdminUniversityItemDto } from "src/interfaces/UniversityPageDto";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { RouterLink } from "mobx-state-router";
import { Paginator } from "src/components/common/Paginator";

export const UniversityListPage = () => {
  const s = useRootStore().universityListPage;
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <RouterLink routeName={RouteNames.universityCreatePage}>Create</RouterLink>
          <AdminTable<AdminUniversityItemDto>
            columns={dmap(AllLanguages, (l) => ({
              id: l,
              header: l,
              renderer: (row) => {
                if (!row.languages.hasOwnProperty(l)) return "...";
                return (
                  <RouterLink routeName={RouteNames.universityPage} params={{ id: row.id.toString() }}>
                    <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
                      {row.languages[l].name}
                    </a>
                  </RouterLink>
                );
              },
            }))}
            rows={s.items.slice(s.currentPage * 10, (s.currentPage + 1) * 10)}
            idGetter={(r) => r.id.toString()}
          />
          {s.totalPages > 1 && (
            <Paginator page={s.currentPage} totalPages={s.totalPages} setPage={(p) => (s.currentPage = p)} />
          )}
        </div>
      </div>
    </div>
  ));
};
