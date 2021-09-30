import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { AdminButton } from "../../components/common/AdminButton";
import { DropDownList } from "@project/components/src/blocks/FaqBlock/faqBlock";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routing/routes";
import { RequestFormSettings } from "./requestFormSetting/requestFormSetting";
import { HeaderSettings } from "./headerSetting/headerSetting";
import { FooterSettings } from "./footerSetting/footerSetting";

export const AdminGlobalSettingEditor = () => {
  const { globalSettingsPage: s } = useRootStore();
  const [name, setName] = useState("");

  return useObserver(() => (
    <div className={`max-w-7xl py-10 mx-auto px-10`}>
      <div className={`flex justify-between mb-4 w-full`}>
        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "en" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            English
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "ru" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Russian
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "fr" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            France
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "esp" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Spaien
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "ch" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            China
          </a>
        </RouterLink>
      </div>
      <DropDownList name={`Header`} active={name === "Header"} onClick={() => setName(`Header`)}>
        <HeaderSettings s={s} />
      </DropDownList>
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
