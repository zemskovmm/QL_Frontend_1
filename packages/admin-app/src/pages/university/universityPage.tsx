import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { RouteNames } from "src/routing/routes";
import React, { ChangeEvent, useState } from "react";
import { AdminTable } from "src/components/common/AdminTable";
import { AdminTraitListItemDto } from "src/interfaces/TraitPageDto";
import { dmap } from "src/utils/util";
import { AllLanguages } from "@project/components/src/utils/langs";
import { RouterLink } from "mobx-state-router";
import { Paginator } from "src/components/common/Paginator";
import { PageEditor } from "../../components/pageEditor/PageEditor";

const EditStringRow = (props: {
  editOn: boolean;
  value?: string;
  type: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {props.editOn ? (
        <input
          className={props.editOn ? "border-red-600 border-2" : ""}
          onChange={(e) => props.change(e)}
          value={props.value ?? ""}
          type={props.type}
        />
      ) : (
        props.value
      )}
    </>
  );
};

export const UniversityPage = () => {
  const s = useRootStore().universityPage;
  const lang = ["en", "fr", "ru", "esp", "cn"];
  const [langState, setLangState] = useState("en");
  const [onEdit, setOnEdit] = useState(false);
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-/xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <div className={`flex`}>
            <RouterLink
              className={
                "d-flex mb-4 mr-auto text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              routeName={RouteNames.universityList}
            >
              back in list
            </RouterLink>
            <RouterLink
              className={
                "d-flex mb-4 mr-4 text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              routeName={RouteNames.universityTraitEditPage}
              params={{ id: s.id }}
            >
              Trait Edit
            </RouterLink>
            <button
              className={
                "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              onClick={async () => {
                if (onEdit) await s.save();
                setOnEdit(!onEdit);
              }}
            >
              {onEdit ? "Save" : "Edit"}
            </button>
          </div>
          <div className={`mb-4`}>ID: {s.id}</div>
          <div className={`mb-4`}>
            LogoID:
            <EditStringRow
              editOn={onEdit}
              value={s.logoId?.toString()}
              type={"number"}
              change={(e) => (s.logoId = Number(e.target.value))}
            />
          </div>
          <div className={`mb-4`}>
            BannerID:{" "}
            <EditStringRow
              editOn={onEdit}
              value={s.bannerId?.toString()}
              type={"number"}
              change={(e) => (s.bannerId = Number(e.target.value))}
            />
          </div>
          <div className={`mb-5`}>
            Foundation year:{" "}
            <EditStringRow
              editOn={onEdit}
              value={s.foundationYear?.toString()}
              type={"number"}
              change={(e) => (s.foundationYear = Number(e.target.value))}
            />
          </div>
          <div className={`flex justify-between mb-4`}>
            {lang.map((el) => (
              <button onClick={() => setLangState(el)} type={"button"} className={`px-3 bb-1`}>
                {el}
              </button>
            ))}
          </div>
          {s.items[langState] && (
            <div className={`flex justify-between`}>
              <textarea
                className={`w-6/12 mr-4`}
                disabled={!onEdit}
                value={s.items[langState].htmlDescription}
                onChange={(e) => (s.items[langState].htmlDescription = e.target.value)}
              />
              <div className={`w-6/12 ml-4`} dangerouslySetInnerHTML={{ __html: s.items[langState].htmlDescription }} />
            </div>
          )}
        </div>
      </div>
    </div>
  ));
};
