import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import React, { useState } from "react";
import { RouterLink } from "mobx-state-router";

export const UniversityCreatePage = () => {
  const s = useRootStore().universityCreatePage;
  const lang = ["en", "fr", "ru", "esp", "cn"];
  const [langState, setLangState] = useState("en");
  return useObserver(() => (
    <div className="container mx-auto px-4 sm:px-8 max-w-/xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <div className={`flex`}>
            <RouterLink
              className={
                "d-flex mb-4 text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
              }
              routeName={AdminRouteNames.universityList}
            >
              back in list
            </RouterLink>
            <button
              onClick={async () => await s.save()}
              className={
                "d-flex mb-4 ml-auto text-white font-bold py-2 px-4 rounded inline-block bg-green-400 hover:bg-green-100 hover:text-black"
              }
            >
              Save
            </button>
          </div>
          <div className={`flex flex-col`}>
            <div className={`mb-4`}>LogoID:</div>
            <input type="number" />
          </div>
          <div className={`flex flex-col`}>
            <div className={`mb-4`}>BannerID:</div>
            <input type="number" />
          </div>
          <div className={`flex flex-col`}>
            <div className={`mb-4`}>Foundation year:</div>
            <input type="number" />
          </div>
          <div className={`flex justify-between mb-4`}>
            {lang.map((el) => (
              <button onClick={() => setLangState(el)} type={"button"} className={`px-3 bb-1`}>
                {el}
              </button>
            ))}
          </div>
          {s.items[langState] && (
            <div className={`flex flex-col`}>
              <div>
                Name: <input type="text" />
              </div>
              <div>
                Url: <input type="text" />
              </div>
              <div className={`flex justify-between`}>
                <textarea
                  className={`w-6/12 mr-4`}
                  value={s.items[langState].htmlDescription}
                  onChange={(e) => (s.items[langState].htmlDescription = e.target.value)}
                />
                <div
                  className={`w-6/12 ml-4`}
                  dangerouslySetInnerHTML={{ __html: s.items[langState].htmlDescription }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ));
};
