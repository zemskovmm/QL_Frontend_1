import { useRootStore } from "src/utils/rootStoreUtils";
import React from "react";
import { TraitEditor } from "src/components/traitEditor";

export const UniversityTraitEditorPage = () => {
  const { universityTraitEditPage } = useRootStore();
  return <TraitEditor store={universityTraitEditPage.traitStore} />;
};
