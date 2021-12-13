import React from "react";
import { useObserver } from "mobx-react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";
import { RouterLink } from "mobx-state-router";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { findIndex, dropWhile, remove } from "lodash";

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
              routeName={AdminRouteNames.traitList}
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
          <div className={`flex flex-col text-center mb-6`}>
            <span className={`mb-2`}>Where the trait will be used?</span>
            <div className={`flex justify-between w-full`}>
              <label className={`cursor-pointer`}>
                <input
                  type="checkbox"
                  checked={store.checkedOrNot("University")}
                  onChange={() => store.changeEntity("University", 0)}
                />
                <span className={`ml-2`}>University</span>
              </label>
              <label className={`cursor-pointer`}>
                <input
                  type="checkbox"
                  checked={store.checkedOrNot("Housing")}
                  onChange={() => store.changeEntity("Housing", 1)}
                />
                <span className={`ml-2`}>Housing</span>
              </label>
              <label className={`cursor-pointer`}>
                <input
                  type="checkbox"
                  checked={store.checkedOrNot("School")}
                  onChange={() => store.changeEntity("School", 2)}
                />
                <span className={`ml-2`}>School</span>
              </label>
              <label className={`cursor-pointer`}>
                <input
                  type="checkbox"
                  checked={store.checkedOrNot("Page")}
                  onChange={() => store.changeEntity("Page", 3)}
                />
                <span className={`ml-2`}>Page</span>
              </label>
              <label className={`cursor-pointer`}>
                <input
                  type="checkbox"
                  checked={store.checkedOrNot("Course")}
                  onChange={() => store.changeEntity("Course", 4)}
                />
                <span className={`ml-3`}>Course</span>
              </label>
            </div>
          </div>
          <div className={`flex justify-between`}>
            <RouterLink
              className={
                "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              routeName={AdminRouteNames.traitPage}
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
