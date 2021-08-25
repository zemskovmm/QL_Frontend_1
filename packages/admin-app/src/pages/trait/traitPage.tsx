import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { RouteNames } from "src/routing/routes";
import React from "react";
import { AdminTable } from "src/components/common/AdminTable";
import { AdminTraitListItemDto } from "src/interfaces/TraitPageDto";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { RouterLink } from "mobx-state-router";
import { Paginator } from "src/components/common/Paginator";

export const TraitPage = () => {
  const s = useRootStore().traitPage;
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <RouterLink
            className={
              "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
            }
            routeName={RouteNames.traitList}
          >
            Back to list
          </RouterLink>
          <RouterLink
            className={
              "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
            }
            routeName={RouteNames.traitTypeEdit}
            params={{ id: s.traitTypeId }}
          >
            Edit Trait Type
          </RouterLink>
          <RouterLink
            className={
              "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
            }
            routeName={RouteNames.traitCreate}
            params={{ id: s.traitTypeId }}
          >
            Create new
          </RouterLink>
          <AdminTable<AdminTraitListItemDto>
            columns={dmap(AllLanguages, (l) => ({
              id: l,
              header: l,
              renderer: (row) => {
                if (!row.names.hasOwnProperty(l)) return "...";
                return (
                  <RouterLink routeName={RouteNames.traitItemPage} params={{ id: row.id.toString() }}>
                    <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">{row.names[l]}</a>
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
