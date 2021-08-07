import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { PageEditor } from "src/components/pageEditor/PageEditor";

export const PageEditorPage = () => {
  const { pageEditorPage } = useRootStore();
  return useObserver(() => (
    <div className={"m-2"}>
      <PageEditor store={pageEditorPage.editor!} />
    </div>
  ));
};
