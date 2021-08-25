import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { RouteNames } from "src/routing/routes";
import React, { FC, useState } from "react";
import { RouterLink } from "mobx-state-router";
import { TraitItemPageStore } from "../../stores/pages/trait/traitItemPageStore";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminLanguageDictionaryEditorCustomization } from "../school/page";

const lang = ["en", "fr", "ru", "esp", "cn"];

type TraitViewModeProps = {
  s: TraitItemPageStore;
};

const customize = new AdminLanguageDictionaryEditorCustomization();

const TraitViewMode: FC<TraitViewModeProps> = ({ s }) => (
  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
    <div className={`mb-4`}>ID: {s.id} </div>
    <div className={`mb-4`}>TypeID: {s.typeId} </div>
    <div className={`mb-4`}>partnerID: {s.partnerId}</div>
    <table className={"border-separate border border-green-800 w-full mb-6"}>
      <tbody>
        {lang.map((el) => (
          <tr>
            <td className={`border-2 border-emerald-600 px-4 py-2 font-flow text-emerald-400`}>{el}:</td>
            <td className={`border-2 border-emerald-600 px-4 py-2 font-flow text-emerald-400`}>{s.names[el]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className={`mb-4`}>Order: {s.order} </div>
    <div className={`mb-4`}>IconID: {s.iconId} </div>
  </div>
);

export const TraitItemPage = () => {
  const [editOn, setEditOn] = useState(false);
  const s = useRootStore().traitItemPage;
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
              params={{ id: s.typeId.toString() }}
            >
              Back to list
            </RouterLink>
            {!editOn ? (
              <button
                onClick={() => setEditOn(true)}
                className={
                  "d-flex mb-4 mr text-white font-bold py-2 px-4 rounded inline-block bg-green-400 hover:bg-green-100 hover:text-black"
                }
              >
                Edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  await s.save();
                  setEditOn(false);
                }}
                className={
                  "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-green-400 hover:bg-green-100 hover:text-black"
                }
              >
                Save
              </button>
            )}
          </div>
          {!editOn ? <TraitViewMode s={s} /> : <RemoteUiEditor store={s.remoteUi!} customization={customize} />}
        </div>
      </div>
    </div>
  ));
};

export const NewTraitPage = () => {
  const s = useRootStore().traitNewItemPage;
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
              params={{ id: s.traitTypeId.toString() }}
            >
              back in trait
            </RouterLink>
            <button
              onClick={async () => {
                await s.save();
              }}
              className={
                "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-green-400 hover:bg-green-100 hover:text-black"
              }
            >
              Save
            </button>
          </div>
          <RemoteUiEditor store={s.remoteUi!} customization={customize} />
        </div>
      </div>
    </div>
  ));
};
