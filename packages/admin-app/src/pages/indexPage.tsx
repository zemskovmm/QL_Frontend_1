import React from "react";
import { useRootStore } from "../utils/rootStoreUtils";
import { useObserver } from "mobx-react";

export const IndexPage = () => {
  const { loginStore: s } = useRootStore();
  return useObserver(() => (
    <div className={`w-6/12 m-auto `}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await s.logIn();
        }}
        className={`flex flex-col`}
      >
        <input
          type="text"
          placeholder={`username`}
          value={s.username}
          onChange={(e) => (s.username = e.target.value)}
        />
        <input
          type="password"
          placeholder={`password`}
          value={s.password}
          onChange={(e) => (s.password = e.target.value)}
        />
        <label>
          <input type="checkbox" checked={!s.rememberMe} onChange={(e) => (s.rememberMe = !e.target.checked)} />
          <span className={`ml-3`}>don't remember me</span>
        </label>
        <button>login</button>
      </form>
    </div>
  ));
};
