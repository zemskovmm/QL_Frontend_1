import React, { FC } from "react";
import { useObserver } from "mobx-react";
import styles from "src/components/PaginatedTable/paginated-table.module.css";
import { RouterLink } from "mobx-state-router";
import { ReactTableStore } from "src/stores/table/ReactTableStore";
import { Paginator } from "../common/Paginator";

type StorePaginationProps = {
  store: ReactTableStore<any>;
};

export const StorePagination: FC<StorePaginationProps> = ({ store }) =>
  useObserver(() => (
    <Paginator page={store.page} totalPages={store.totalPages} setPage={(p) => (store.totalPages = p)} />
  ));

export type PaginatedTableProps<TItem> = {
  store: ReactTableStore<TItem>;
  editPagePath: string;
  detailPagePath: string;
};

export const PaginatedTable: FC<PaginatedTableProps<{ id: string | number; title: string }>> = ({
  store,
  editPagePath,
  detailPagePath,
}) => {
  return useObserver(() => (
    <div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {store.items.map((el, index) => (
                    <tr key={`table item ${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {el.id}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{el.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <>
                          <RouterLink
                            routeName={editPagePath}
                            params={{ id: `${el.id}`, type: `${store.tableType}` }}
                            className="mr-8 text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </RouterLink>
                          <RouterLink
                            routeName={detailPagePath}
                            params={{ id: `${el.id}` }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Open
                          </RouterLink>
                        </>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {store.totalPages > 0 && (
        <div className={styles.news__back}>
          <div>
            <div style={{ marginTop: "1rem" }}>
              <StorePagination store={store} />
            </div>
          </div>
        </div>
      )}
      {store.totalPages === 0 && <div className={styles.news__back}>Подходящих результатов не найдено.</div>}
    </div>
  ));
};
