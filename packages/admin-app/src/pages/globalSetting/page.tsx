import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { AdminButton } from "../../components/common/AdminButton";
import { DropDownList } from "@project/components/src/blocks/FaqBlock/faqBlock";
import { RequestFormSettings } from "./requestFormSetting/requestFormSetting";
import { HeaderSettings } from "./headerSetting/headerSetting";
import { FooterSettings } from "./footerSetting/footerSetting";
import { ChooseLang } from "./common/commonGlobal";

export const AdminGlobalSettingEditor = () => {
  const { globalSettingsPage: s } = useRootStore();
  const [name, setName] = useState("");

  return useObserver(() => (
    <div className={`max-w-7xl py-10 mx-auto px-10`}>
      <ChooseLang />
      <DropDownLista name={`Header`} active={name === "Header"} onClick={() => setName(`Header`)}>
        <HeaderSettings s={s} />
      </DropDownLista>
      <DropDownList name={`Request Form`} active={name === "Request Form"} onClick={() => setName(`Request Form`)}>
        <RequestFormSettings s={s} />
      </DropDownList>
      <DropDownList name={`Footer`} active={name === "Footer"} onClick={() => setName(`Footer`)}>
        <FooterSettings s={s} />
      </DropDownList>
      <AdminButton color={`save`} onClick={() => s.save()}>
        Save
      </AdminButton>
    </div>
  ));
};
