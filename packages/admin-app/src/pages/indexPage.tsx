import React, { useState } from "react";
import { PageEditorStore } from "src/components/pageEditor/PageEditorStore";
import { PageEditor } from "src/components/pageEditor/PageEditor";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import { useRootStore } from "../utils/rootStoreUtils";
import { useObserver } from "mobx-react";

export const IndexPage = () => {
  const { loginStore: s } = useRootStore();
  return useObserver(() => (
    <div className={`w-6/12 mx-auto my-12`}>
      <div className={`flex flex-col`}>
        <input
          type="text"
          placeholder={`username`}
          value={s.username}
          onChange={(e) => (s.username = e.target.value)}
        />
        <input
          type="text"
          placeholder={`password`}
          value={s.password}
          onChange={(e) => (s.password = e.target.value)}
        />
        <label>
          <input type="checkbox" checked={!s.rememberMe} onChange={(e) => (s.rememberMe = !e.target.checked)} />
          <span>don't remember me</span>
        </label>
        <button onClick={() => s.save()}>login</button>
      </div>
    </div>
  ));
};
