import React, { FC, Suspense } from "react";
import { useObserver } from "mobx-react";
import { HtmlEditor } from "../../../components";
import { AdminInputBox } from "../../../components/common/AdminInputBox";
import { GlobalSettingsPageStore } from "../../../stores/pages/globalSettings/globalSettingsPageStore";
import { RouteNames } from "../../../routing/routes";
import { RouterLink } from "mobx-state-router";

export const PersonalCabinetSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div className={`px-1`}>
      <div className={`flex justify-between`}>
        <span className={`text-lg`}>Profile Form</span>
        <RouterLink routeName={RouteNames.formEditorPage} params={{ lang: "en", type: "profile" }}>
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
