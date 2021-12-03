import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { GlobalSettingsPageStore } from "src/stores/pages/adminStores/globalSettings/globalSettingsPageStore";
import { GlobalLink, GlobalSocialLink } from "../common/commonGlobal";

export const HeaderSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <GlobalLink value={s.headerTopLink} name={`Top Link`} />
      <GlobalSocialLink value={s.headerSocialLink} name={"Social link"} />
      <GlobalLink value={s.headerBottomLink} name={`Bottom Link`} />
    </div>
  ));
};
