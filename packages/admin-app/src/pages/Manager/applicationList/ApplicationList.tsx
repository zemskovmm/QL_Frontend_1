import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { ManagerApplicationDto } from "../../../interfaces/ManagerRpc";
import { RouterLink } from "mobx-state-router";
import { ManagerRouteNames } from "../ManagerRoutes";
import { Paginator } from "../../../components/common/Paginator";

const StyleVariant: any = {
  Visa: `bg-blue-400`,
  University: `bg-pink-400`,
  Housing: `bg-green-500`,
  Course: `bg-red-400`,
};

const ManagerApplicationListItem: FC<{ item: ManagerApplicationDto }> = ({ item }) => {
  return (
    <RouterLink
      routeName={ManagerRouteNames.applicationId}
      params={{ userId: String(item.userId), applicationId: String(item.id) }}
      className={`flex flex-col border-r w-3-calc items-center px-4 py-4 box-border border rounded transition transition-delay-300 hover:opacity-100 ${
        StyleVariant[item.type]
      } ${item.status === "New" ? "" : "opacity-80"}`}
    >
      <div className={`ml-auto bg-white text-sm px-2 rounded-md`}>{item.status}</div>
      <div className={`flex flex-col text-center items-center text-xl mb-4`}>
        <div className={`rounded-full h-16 w-16 flex items-center justify-center bg-white opacity-90 mb-4`}>
          {item.type[0]}
        </div>
        <span>{item.type}</span>
        <span>{item.firstName}</span>
        <span>{item.lastName}</span>
      </div>
      <div className={`flex justify-between`}>
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
