import { useRootStore } from "src/utils/rootStoreUtils";
import { AdminButton } from "src/components/common/AdminButton";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";
import { AdminTable } from "src/components/common/AdminTable";
import { Paginator } from "src/components/common/Paginator";
import { dmap } from "src/utils/util";
import { AllLanguages } from "src/utils/langs";
import { AdminPageListItemDto } from "src/interfaces/PageDto";

export const PageListPage = () => {
  var s = useRootStore().pageListPage;
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <div className="m-4">
              <RouterLink routeName={RouteNames.newPage}>
                <AdminButton color={"primary"}>Create Page</AdminButton>
              </RouterLink>
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
              rows={s.current.results}
              idGetter={(r) => r.id.toString()}
            />
            <Paginator page={s.currentPage} totalPages={s.current.totalPages} setPage={(p) => s.load(p)} />
          </div>
        </div>
      </div>
    </div>
  );
};
