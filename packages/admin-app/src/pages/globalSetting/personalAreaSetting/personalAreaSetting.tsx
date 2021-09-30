import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { GlobalSettingsPageStore } from "../../../stores/pages/globalSettings/globalSettingsPageStore";
import { GlobalLink, GlobalSocialLink } from "../common/commonGlobal";

export const PersonalAreaSetting: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => <div></div>);
};
