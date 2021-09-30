import React, { FC, useState } from "react";
import { useObserver } from "mobx-react";
import { GlobalSettingsPageStore } from "../../../stores/pages/globalSettings/globalSettingsPageStore";
import { GlobalLink, GlobalSocialLink } from "../common/commonGlobal";
import { DropDownList } from "@project/components/src/blocks/FaqBlock/faqBlock";

const ProfileForm: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => <div></div>);
};

export const PersonalAreaSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  const [name, setName] = useState("");
  return useObserver(() => (
    <div>
      <DropDownList name={`Profile`} active={name === "Profile"} onClick={() => setName(`Profile`)}>
        <ProfileForm s={s} />
      </DropDownList>
    </div>
  ));
};
