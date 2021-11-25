import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { GlobalSettingsPageStore } from "src/stores/pages/globalSettings/globalSettingsPageStore";
import { AdminRouteNames } from "src/pages/Admin/AdminRoutes";
import { RouterLink } from "mobx-state-router";

export const PersonalCabinetSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div className={`px-1`}>
      <div className={`flex justify-between mb-4`}>
        <span className={`text-lg`}>Profile Form</span>
        <RouterLink routeName={AdminRouteNames.formEditorPageProfile} params={{ lang: s.lang }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Edit
          </a>
        </RouterLink>
      </div>
      <div className={`flex justify-between mb-4`}>
        <span className={`text-lg`}>University Form</span>
        <RouterLink routeName={AdminRouteNames.formEditorPageUniversity} params={{ lang: s.lang }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Edit
          </a>
        </RouterLink>
      </div>
      <div className={`flex justify-between mb-4`}>
        <span className={`text-lg`}>Course Form</span>
        <RouterLink routeName={AdminRouteNames.formEditorPageCourse} params={{ lang: s.lang }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Edit
          </a>
        </RouterLink>
      </div>
      <div className={`flex justify-between mb-4`}>
        <span className={`text-lg`}>Housing Form</span>
        <RouterLink routeName={AdminRouteNames.formEditorPageHousing} params={{ lang: s.lang }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Edit
          </a>
        </RouterLink>
      </div>
      <div className={`flex justify-between`}>
        <span className={`text-lg`}>Visa Form</span>
        <RouterLink routeName={AdminRouteNames.formEditorPageVisa} params={{ lang: s.lang }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Edit
          </a>
        </RouterLink>
      </div>
    </div>
  ));
};
