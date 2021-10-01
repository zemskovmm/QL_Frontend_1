import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { FormEditor } from "./Editor/FormEditor";

export const FormEditorPage = () => {
  const { formEditorPage } = useRootStore();
  return useObserver(() => (
    <div className={"m-2"}>
      <FormEditor store={formEditorPage.editor!} />
    </div>
  ));
};
