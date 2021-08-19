import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { RouteNames } from "src/routing/routes";
import React, { ChangeEvent, useState } from "react";
import { AdminTable } from "src/components/common/AdminTable";
import { AdminTraitListItemDto } from "src/interfaces/TraitPageDto";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { RouterLink } from "mobx-state-router";
import { Paginator } from "src/components/common/Paginator";
import { PageEditor } from "../../components/pageEditor/PageEditor";

export const UniversityTraitEditPage = () => {
  const s = useRootStore().universityTraitEditPage;
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-/xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <RouterLink
            className={
              "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
            }
            routeName={RouteNames.universityPage}
            params={{ id: s.id }}
          >
            back in university
          </RouterLink>
          <div className={`mb-4`}>ID: {s.id}</div>
          <div className={`mb-4 flex items-center flex-wrap`}>
            Traits:{" "}
            {s.traitAvailable.map((el) => (
              <button
                className={
                  "d-flex ml-4 text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
                }
                onClick={async () => await s.traitLoad(el.id.toString())}
              >
                {el.names["en"]}
              </button>
            ))}
          </div>
          <div className={`flex`}>
            <div className={`w-6/12 mr-4`}>
              <div>Have</div>
              <AdminTable<AdminTraitListItemDto>
                columns={dmap(AllLanguages, (l) => ({
                  id: l,
                  header: l,
                  renderer: (row) => {
                    if (!row.names.hasOwnProperty(l)) return "...";
                    return (
                      <div onClick={() => s.removeTrait(row.id.toString())}>
                        <span className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
                          {row.names[l]}
                        </span>
                      </div>
                    );
                  },
                }))}
                rows={s.itemsHave.slice(s.currentPageHave * 10, (s.currentPageHave + 1) * 10)}
                idGetter={(r) => r.id.toString()}
              />
              {s.currentPageHave > 1 && (
                <Paginator
                  page={s.currentPageHave}
                  totalPages={s.currentPageHave}
                  setPage={(p) => (s.currentPageHave = p)}
                />
              )}
            </div>
            <div className={`w-6/12 ml-4`}>
              <div>Available</div>
              <AdminTable<AdminTraitListItemDto>
                columns={dmap(AllLanguages, (l) => ({
                  id: l,
                  header: l,
                  renderer: (row) => {
                    if (!row.names.hasOwnProperty(l)) return "...";
                    return (
                      <div onClick={() => s.addTrait(row.id.toString())}>
                        <span className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
                          {row.names[l]}
                        </span>
                      </div>
                    );
                  },
                }))}
                rows={s.itemsAvailable.slice(s.currentPageAvailable * 10, (s.currentPageAvailable + 1) * 10)}
                idGetter={(r) => r.id.toString()}
              />
              {s.totalPagesAvailable > 1 && (
                <Paginator
                  page={s.currentPageAvailable}
                  totalPages={s.totalPagesAvailable}
                  setPage={(p) => (s.currentPageAvailable = p)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};
