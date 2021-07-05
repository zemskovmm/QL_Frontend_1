import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminButton } from "src/components/common/AdminButton";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";
import { AdminTable } from "src/components/common/AdminTable";
import { Paginator } from "src/components/common/Paginator";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { AdminPageListItemDto } from "src/interfaces/AdminPageDto";
import { useObserver } from "mobx-react";
import { useThrottle } from "../utils/throttle-effect";

export const PageListPage = () => {
  const s = useRootStore().pageListPage;
  useThrottle({ action: () => s.search(), timeout: 300, data: null }, [s.searchQuery, s.searchLang]);
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <div className={`flex items-center justify-between`}>
              <div className="m-4">
                <RouterLink routeName={RouteNames.newPage}>
                  <AdminButton color={"primary"}>Create Page</AdminButton>
                </RouterLink>
              </div>
              <div className={`flex flex-col`}>
                <label className={`flex`}>
                  <div className={`mr-4`}>Search:</div>
                  <input
                    value={s.searchQuery}
                    onChange={(e) => (s.searchQuery = e.target.value)}
                    type="text"
                    className={`border-2 border-black`}
                  />
                  <select onChange={(e) => (s.searchLang = e.target.value)} value={s.searchLang}>
                    <option value="en">en</option>
                    <option value="ru">rus</option>
                    <option value="fr">fr</option>
                    <option value="cn">cn</option>
                    <option value="esp">esp</option>
                  </select>
                </label>
                <div className={`flex`}>Find: {s.currentState.length}</div>
              </div>
            </div>
            <AdminTable<AdminPageListItemDto>
              columns={dmap(AllLanguages, (l) => ({
                id: l,
                header: l,
                renderer: (row) => {
                  if (!row.titles.hasOwnProperty(l)) return "...";
                  return (
                    <RouterLink routeName={RouteNames.editPage} params={{ id: row.id.toString() }}>
                      <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
                        {row.titles[l]}
                        <br />
                        <sup>{row.urls[l]}</sup>
                      </a>
                    </RouterLink>
                  );
                },
              }))}
              rows={s.current.slice(s.currentPage * 10, (s.currentPage + 1) * 10)}
              idGetter={(r) => r.id.toString()}
            />
            <Paginator page={s.currentPage} totalPages={s.totalPages} setPage={(p) => s.load(p)} />
          </div>
        </div>
      </div>
    </div>
  ));
};
