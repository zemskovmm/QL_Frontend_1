import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { ManagerApplicationDto } from "../../../interfaces/ManagerRpc";
import { RouterLink } from "mobx-state-router";
import { ManagerRouteNames } from "../ManagerRoutes";
import { Paginator } from "../../../components/common/Paginator";

const ManagerApplicationListItem: FC<{ item: ManagerApplicationDto }> = ({ item }) => {
  return (
    <RouterLink
      routeName={ManagerRouteNames.applicationId}
      params={{ userId: String(item.userId), applicationId: String(item.id) }}
      className={`flex flex-col w-3-calc px-4 py-2 box-border border`}
    >
      <div className={`flex justify-between mb-10`}>
        <div className={`flex flex-col text-xl`}>
          <span>{item.firstName}</span>
          <span>{item.lastName}</span>
        </div>
        {item.status}
      </div>
      <div className={`flex justify-between`}>
        {item.type}
        <div>
          <span className={`mr-2`}>Entity id: {item.entityId}</span>
          <span className={`mr-2`}>User id: {item.userId}</span>
          <span>Id: {item.id}</span>
        </div>
      </div>
    </RouterLink>
  );
};

export const ApplicationList = () => {
  const { mangerApplicationListPage: s } = useRootStore();
  return useObserver(() => (
    <div className={`flex flex-col p-10 w-full`}>
      <div className={`flex flex-wrap gap-2`}>
        {s.applications.items?.map((el, i) => (
          <ManagerApplicationListItem item={el} key={`${el.id} ${i}`} />
        ))}
      </div>
      {s.applications.totalPages > 1 && (
        <Paginator
          page={s.listSettings.page}
          totalPages={Number(s.applications.totalPages)}
          setPage={async (p) => {
            s.listSettings.page = p;
            await s.load();
          }}
        />
      )}
    </div>
  ));
};
