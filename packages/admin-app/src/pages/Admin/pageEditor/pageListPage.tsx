import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminButton } from "src/components/common/AdminButton";
import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { AdminTable } from "src/components/common/AdminTable";
import { Paginator } from "src/components/common/Paginator";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { AdminPageListItemDto } from "src/interfaces/AdminPageDto";
import { useObserver } from "mobx-react";
import { AdminSearch } from "src/components/common/AdminSearch";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const PageListPage = () => {
  const s = useRootStore().pageListPage;
  const params = new URLSearchParams(window.location.search);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    s.search = params.get("search") || "";
    s.currentPage = Number(params.get("page") || 0);
    s.load();
  }, [location]);

  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <div className={`flex items-center justify-between`}>
              <div className="m-4 flex w-full">
                <RouterLink routeName={AdminRouteNames.newPage} className={`mr-auto`}>
                  <AdminButton color={"primary"}>Create Page</AdminButton>
                </RouterLink>
                <AdminSearch
                  search={s.search}
                  action={(search: string) => {
                    params.set("page", "0");
                    params.set("search", search);
                    history.push(window.location.pathname + "?" + params.toString());
                  }}
                />
              </div>
            </div>
            <AdminTable<AdminPageListItemDto>
              columns={dmap(AllLanguages, (l) => ({
                id: l,
                header: l,
                renderer: (row) => {
                  if (!row.titles.hasOwnProperty(l)) return "...";
                  return (
                    <RouterLink routeName={AdminRouteNames.editPage} params={{ id: row.id.toString() }}>
                      <a className="text-blue-500 hover:text-blue-300 cursor-pointer underline">
                        {row.titles[l]}
                        <br />
                        <sup>{row.urls[l]}</sup>
                      </a>
                    </RouterLink>
                  );
                },
              }))}
              rows={s.current}
              idGetter={(r) => r.id.toString()}
            />
            <Paginator
              page={s.currentPage}
              totalPages={s.totalPages}
              setPage={(p) => {
                params.set("page", p.toString());
                history.push(window.location.pathname + "?" + params.toString());
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ));
};
