import React, { FC } from "react";
import { useObserver } from "mobx-react";
import styles from "src/components/PaginatedTable/paginated-table.module.css";
import { RouterLink } from "mobx-state-router";
import { BadgeList, BadgeTypes } from "./BadgeList/BadgeList";
import Pagination from "react-js-pagination";
import { ReactTableStore } from "../../stores/table/ReactTableStore";

type ListItemProps = {
  id: number;
  // route: string;
  title?: string;
  description?: string;
  subDescription?: string;
  statuses?: BadgeTypes[];
};

const ListItem: FC<ListItemProps> = (props) => {
  const badges: BadgeTypes[] = props.statuses ?? [BadgeTypes.active];
  return (
    // <RouterLink className={styles.news__link} routeName={props.route} params={{ id: `${props.id}` }}>
    <div className={styles.news__item}>
      <div className={styles.news__itemBadge}>
        <BadgeList statuses={badges} />
      </div>
      <div className={styles.news__itemTitle}>{props.title ?? ""}</div>
      <div className={styles.news__itemSubtitle}>{props.description ?? ""}</div>
      <div className={styles.news__itemText}>{props.subDescription ?? props.title ?? ""}</div>
    </div>
    // </RouterLink>
  );
};

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
      itemClass={styles.pagination__item}
      activeClass={styles.pagination__item__active}
    />
  ));

export type PaginatedTableProps<TItem> = {
  store: ReactTableStore<TItem>;
  renderCell: (item: TItem) => ListItemProps;
};

export function PaginatedTable<T extends unknown>({ store, renderCell }: PaginatedTableProps<T>) {
  return useObserver(() => (
    <div>
      {store.totalPages > 0 && (
        <div className={styles.news__back}>
          <div>
            <div className="d-flex flex-column">
              {store.items.map((item, index) => (
                <ListItem key={index} {...renderCell(item)} />
              ))}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <StorePagination store={store} />
            </div>
          </div>
        </div>
      )}
      {store.totalPages === 0 && <div className={styles.news__back}>Подходящих конкурсов не найдено.</div>}
    </div>
  ));
}
