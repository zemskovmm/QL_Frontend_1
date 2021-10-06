import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { FormEditor } from "./Editor/FormEditor";
import { SchemeEditor } from "./SchemeEditor/SchemeEditor";

export const FormEditorPage = () => {
  const { formEditorPage } = useRootStore();
  return useObserver(() => (
    <div className={"m-2 flex"}>
      <div className={`w-10/12`}>
        <FormEditor store={formEditorPage.editor!} />
      </div>
      <div className={`w-2/12`}>
        <SchemeEditor s={formEditorPage.editor!} />
      </div>
    </div>
  ));
};
