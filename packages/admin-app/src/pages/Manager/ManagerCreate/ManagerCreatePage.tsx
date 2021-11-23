import React from "react";
import { useRootStore } from "../../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { AdminInputBox } from "../../../components/common/AdminInputBox";
import { AdminButton } from "../../../components/common/AdminButton";

export const ManagerCreatePage = () => {
  const { mangerCreatePage: s } = useRootStore();
  return useObserver(() => (
    <div className={`flex flex-col border border-gray-300 container mt-10 m-auto p-4 sm:px-8 max-w-3xl`}>
      <h1 className={`text-big mb-4`}>Create Manager</h1>
      <form onSubmit={() => s.register()} className={`flex flex-col items-start`}>
        <AdminInputBox
          onChange={(e) => (s.email = e.target.value)}
          label={`Email`}
          errors={s.errors.email}
          variant={1}
          value={s.email}
        />
        <AdminInputBox
          onChange={(e) => (s.password = e.target.value)}
          label={`Password`}
          errors={s.errors.password}
          variant={1}
          value={s.password}
        />
        <AdminInputBox
          onChange={(e) => (s.name = e.target.value)}
          label={`Name`}
          errors={s.errors.name}
          variant={1}
          value={s.name}
        />
        <AdminButton onClick={() => s.register()} color={"danger"}>
          Submit
        </AdminButton>
      </form>
    </div>
  ));
};
