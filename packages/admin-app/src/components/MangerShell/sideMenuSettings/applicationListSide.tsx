import React from "react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { AdminInputBox } from "../../common/AdminInputBox";

export const ApplicationListSide = () => {
  const { mangerApplicationListPage: s } = useRootStore();
  return useObserver(() => (
    <div className={`flex flex-col`}>
      <div className={`text-center text-xl mb-3`}>Search settings</div>
      <div className={`flex mb-2`}>
        <span className={`mr-2`}>Total items: {s.applications.totalItems}</span>{" "}
        <span>Total pages: {s.applications.totalPages} </span>
      </div>
      <label className={`flex justify-between mb-2`}>
        <span>Page size</span>
        <select
          className={`text-black`}
          onChange={(e) => (s.listSettings.pageSize = Number(e.target.value))}
          value={s.listSettings.pageSize}
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
          <option value="80">80</option>
        </select>
      </label>
      <AdminInputBox
        value={s.listSettings.type}
        label={"Type"}
        variant={2}
        onChange={(e) => (s.listSettings.type = e.target.value)}
      />
      {/*<AdminInputBox*/}
      {/*  value={s.listSettings.status}*/}
      {/*  label={"Status"}*/}
      {/*  variant={2}*/}
      {/*  onChange={(e) => (s.listSettings.type = e.target.value)}*/}
      {/*/>*/}
      <label className={`mb-2`}>
        <input
          type="checkbox"
          checked={s.listSettings.isAnswered}
          onChange={(e) => (s.listSettings.isAnswered = e.target.checked)}
        />
        <span className={`ml-3`}>Is Answared</span>
      </label>
      <AdminInputBox
        value={s.listSettings.firstName}
        label={"First name"}
        variant={2}
        onChange={(e) => (s.listSettings.firstName = e.target.value)}
      />
      <AdminInputBox
        value={s.listSettings.lastName}
        label={"Last name"}
        variant={2}
        onChange={(e) => (s.listSettings.lastName = e.target.value)}
      />
      <AdminInputBox
        value={s.listSettings.email}
        label={"Email"}
        variant={2}
        onChange={(e) => (s.listSettings.email = e.target.value)}
      />
      <AdminInputBox
        value={s.listSettings.phone}
        label={"Phone"}
        variant={2}
        onChange={(e) => (s.listSettings.phone = e.target.value)}
      />
      <AdminInputBox
        value={s.listSettings.userId}
        label={"User id"}
        variant={2}
        onChange={(e) => (s.listSettings.userId = e.target.value)}
      />
      <button className={`border mt-2 p-2 hover:border-gray-300`} onClick={async () => await s.getApplication(true)}>
        Search
      </button>
    </div>
  ));
};
