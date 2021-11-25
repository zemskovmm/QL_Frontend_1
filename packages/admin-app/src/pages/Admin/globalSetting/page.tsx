import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { AdminButton } from "src/components/common/AdminButton";
import { DropDownList } from "@project/components/src/blocks/FaqBlock/faqBlock";
import { RequestFormSettings } from "./requestFormSetting/requestFormSetting";
import { HeaderSettings } from "./headerSetting/headerSetting";
import { FooterSettings } from "./footerSetting/footerSetting";
import { ChooseLang } from "./common/commonGlobal";
import { PersonalCabinetSettings } from "./personalCabinetSetting/personalCabinetSetting";

export const AdminGlobalSettingEditor = () => {
  const { globalSettingsPage: s } = useRootStore();
  const [name, setName] = useState("");

  const openList = (type: string) => {
    if (name === type) {
      setName("");
    } else {
      setName(type);
    }
  };

  return useObserver(() => (
    <div className={`max-w-7xl py-10 mx-auto px-10`}>
      <ChooseLang />
      <DropDownList name={`Header`} active={name === "Header"} onClick={() => openList("Header")}>
        <HeaderSettings s={s} />
      </DropDownList>
      <DropDownList name={`Footer`} active={name === "Footer"} onClick={() => openList(`Footer`)}>
        <FooterSettings s={s} />
      </DropDownList>
      <DropDownList name={`Request Form`} active={name === "Request Form"} onClick={() => openList(`Request Form`)}>
        <RequestFormSettings s={s} />
      </DropDownList>
      <DropDownList
        name={`Personal Cabinet`}
        active={name === "Personal Cabinet"}
        onClick={() => openList(`Personal Cabinet`)}
      >
        <PersonalCabinetSettings s={s} />
      </DropDownList>
      <AdminButton color={`save`} onClick={() => s.save()}>
        Save
      </AdminButton>
    </div>
  ));
};
