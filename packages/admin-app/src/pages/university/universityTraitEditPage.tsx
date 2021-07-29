import { useRootStore } from "src/utils/rootStoreUtils";
import React, { ChangeEvent, useState } from "react";
import { TraitEditor } from "../../components/traitEditor";

export const UniversityTraitEditorPage = () => {
  const { universityTraitEditPage } = useRootStore();
  return <TraitEditor store={universityTraitEditPage.traitStore} />;
};
