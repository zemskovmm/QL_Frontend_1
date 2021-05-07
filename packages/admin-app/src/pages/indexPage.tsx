import React from "react";
import { PageEditorStore } from "src/components/pageEditor/PageEditorStore";
import { PageEditor } from "src/components/pageEditor/PageEditor";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "src/routing/routes";

export const IndexPage = () => (
  <div>
    <RouterLink routeName={RouteNames.newPage}>New page</RouterLink>
  </div>
);
