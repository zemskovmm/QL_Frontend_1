import React, { FC } from "react";
import { useObserver } from "mobx-react";
import styles from "src/components/PaginatedTable/paginated-table.module.css";
import Pagination from "react-js-pagination";
import { ReactTableStore } from "../../stores/table/ReactTableStore";

type StorePaginationProps = {
  store: ReactTableStore<any>;
};

export const StorePagination: FC<StorePaginationProps> = ({ store }) =>
  useObserver(() => (
    <Pagination
      totalItemsCount={store.totalPages * store.pageSize}
      itemsCountPerPage={store.pageSize}
      onChange={(pageNumber: number) => store.setPageSize(store.pageSize, pageNumber - 1)}
      activePage={store.page + 1}
      pageRangeDisplayed={3}
      innerClass={styles.pagination__flex}
      itemClass={styles.pagination__item}
      activeClass={styles.pagination__item__active}
    />
  ));

export type PaginatedTableProps<TItem> = {
  store: ReactTableStore<TItem>;
  Cell: FC<{ item: TItem; index: number }>;
};

export function PaginatedTable<T extends unknown>({ store, Cell }: PaginatedTableProps<T>) {
  return useObserver(() => (
    <div>
      {store.totalPages > 0 && (
        <div className={styles.news__back}>
          <div>
            <div className="d-flex flex-column">
              {store.items.map((item, index) => (
                <Cell item={item} index={index} />
              ))}
            </div>
            <div style={{ marginTop: "1rem", display: "flex" }}>
              <StorePagination store={store} />
            </div>
          </div>
        </div>
      )}
      {store.totalPages === 0 && <div className={styles.news__back}>No items</div>}
    </div>
  ));
}
