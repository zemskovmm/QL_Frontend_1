import React from "react";
import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import styles from "./loginPage.module.css";

export const IndexPage = () => {
  const { loginStore: s } = useRootStore();
  return useObserver(() => (
    <div className={`h-screen	flex`} style={{ backgroundColor: `#182023` }}>
      <div className={`w-4/12 m-auto ${styles.loginBoard}`}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await s.logIn();
          }}
          className={`flex flex-col`}
        >
          <label className={`flex flex-col mb-3`}>
            <span className={`mb-3`}>Username</span>
            <input
              type="text"
              placeholder={`username`}
              value={s.username}
              className={styles.loginBoard__input}
              onChange={(e) => (s.username = e.target.value)}
            />
          </label>
          <label className={`flex flex-col mb-6`}>
            <span className={`mb-3`}>Password</span>
            <input
              type="password"
              placeholder={`password`}
              value={s.password}
              className={styles.loginBoard__input}
              onChange={(e) => (s.password = e.target.value)}
            />
          </label>
          <label className={`mb-4`}>
            <input type="checkbox" checked={!s.rememberMe} onChange={(e) => (s.rememberMe = !e.target.checked)} />
            <span className={`ml-3`}>don't remember me</span>
          </label>
          <button
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-gray-500 hover:bg-gray-100 hover:text-black`}
          >
            login
          </button>
        </form>
      </div>
    </div>
  ));
};
