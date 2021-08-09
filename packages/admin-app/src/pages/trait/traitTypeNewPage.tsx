import { useObserver } from "mobx-react";
import { useRootStore } from "../../utils/rootStoreUtils";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routing/routes";
import React from "react";

const customization = new AdminLanguageDictionaryEditorCustomization();

export const TraitTypeNewPage = () => {
  const store = useRootStore().traitTypeNewPage;

  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <div className={`flex justify-between`}>
            <RouterLink
              className={
                "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              routeName={RouteNames.traitList}
            >
              Back to trait type list
            </RouterLink>
            <button
              onClick={async () => {
                await store.save();
              }}
              className={
                "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-green-400 hover:bg-green-100 hover:text-black"
              }
            >
              Save
            </button>
          </div>
          <RemoteUiEditor store={store.remoteUi!} customization={customization} />
        </div>
      </div>
    </div>
  ));
};

export const TraitTypeEditPage = () => {
  const store = useRootStore().traitTypeEditPage;

  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <div className={`flex justify-between`}>
            <RouterLink
              className={
                "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              routeName={RouteNames.traitPage}
              params={{ id: store.traitTypeId }}
            >
              Back to trait list
            </RouterLink>
            <button
              onClick={async () => {
                await store.save();
              }}
              className={
                "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-green-400 hover:bg-green-100 hover:text-black"
              }
            >
              Save
            </button>
          </div>
          <RemoteUiEditor store={store.remoteUi!} customization={customization} />
        </div>
      </div>
    </div>
  ));
};
