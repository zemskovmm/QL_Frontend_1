import { useRootStore } from "src/utils/rootStoreUtils";
import React from "react";
import { TraitEditor } from "src/components/traitEditor";

export const PageTraitEditorPage = () => {
  const { pageTraitEditPage } = useRootStore();
  return <TraitEditor store={pageTraitEditPage.traitStore} />;
};
