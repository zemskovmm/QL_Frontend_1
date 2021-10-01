import React, { FC, useState } from "react";
import { useObserver } from "mobx-react";
import { GlobalSettingsPageStore } from "../../../stores/pages/globalSettings/globalSettingsPageStore";
import { GlobalLink, GlobalSocialLink } from "../common/commonGlobal";
import { DropDownList } from "@project/components/src/blocks/FaqBlock/faqBlock";
import { BlockPresenter } from "@project/components/src/blocks";
import { AdminButton } from "../../../components/common/AdminButton";

const ProfileForm: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <div className="bg-white">
        <div className="relative">
          <div className={`py-12`}>
            {s.blockData == null ? null : <BlockPresenter blockType={s.blockType} blockData={s.blockData} />}
          </div>
          <div className="absolute top-0 right-0">
            <AdminButton color={"primary"} onClick={() => s.triggerEdit()}>
              ...
            </AdminButton>
            &nbsp;
            <AdminButton color={"danger"} onClick={() => s.triggerDelete()}>
              X
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  ));
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
