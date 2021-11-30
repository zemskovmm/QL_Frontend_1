import { FC } from "react";
import { AppLayout } from "./layouts/AppLayout";
import { Notification } from "./components/Notification";
import SignUpPage from "./routes/SignUpPage";
import SignInPage from "./routes/SignInPage";
import NotFoundPage from "./routes/NotFoundPage";
import ProfilePage from "./routes/ProfilePage";
import {
  useRouterStore,
  SIGN_UP_TEMPLATE,
  SIGN_IN_TEMPLATE,
  PROFILE_TEMPLATE,
  SETTINGS_TEMPLATE,
  NEW_APPLICATION_TEMPLATE,
  MY_APPLICATIONS_TEMPLATE,
  CREATE_APPLICATIONS_TEMPLATE,
  SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
  SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
  PROFILE_REDIRECT_CREATE_APPLICATIONS_TEMPLATE,
} from "./stores/RouterStore";
import { useEffect, useState } from "react";
import { useUserStatuseStore } from "./stores/UserStatuseStore";
import { isSecureUrl } from "./stores/RouterStore/_utils";
import SettingsPage from "./routes/SettingsPage";
import { useLocalesStore } from "./stores/LocalesStore";
import { changeLangInUrl, DEFAULT_LANG, urlToLang } from "./locales/utils";
import NewApplication from "./routes/NewApplication";
import MyApplicationsPage from "./routes/MyApplicationsPage";
import CreateApplication from "./routes/CreateApplication";
import { HostLayout } from "@project/components/src/FormBuilderBlocks/HostLayout";
import { useGlobalSettingsStore } from "./stores/GlobalSettingsStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Application: FC = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const { changeUrl } = useRouterStore();
  const { lang, changeLang } = useLocalesStore();
  const { isUnlogined, isLogined } = useUserStatuseStore();
  const { heartbeatAction } = useUserStatuseStore();
  const { getGlobalSettings } = useGlobalSettingsStore();

  useEffect(() => {
    heartbeatAction();
  }, []);

  // useEffect(() => {
  //   if (url !== undefined && (isUnlogined || isLogined)) {
  //     const lang = urlToLang(url);
  //     if (!url || /^\/(\w+\/?)?$/.test(url)) {
  //       if (isLogined) {
  //         route(PROFILE_TEMPLATE.getRoute({ lang: lang || DEFAULT_LANG }), true);
  //       } else {
  //         route(SIGN_IN_TEMPLATE.getRoute({ lang: lang || DEFAULT_LANG }), true);
  //       }
  //       return;
  //     }
  //     if (!lang) {
  //       route(changeLangInUrl(url, DEFAULT_LANG), true);
  //       return;
  //     }
  //     if (isUnlogined && isSecureUrl(url)) {
  //       route(SIGN_IN_TEMPLATE.getRoute({ lang: lang || DEFAULT_LANG }), true);
  //     }
  //     changeLang(lang);
  //     changeUrl(url);
  //     getGlobalSettings(lang);
  //     heartbeatAction();
  //   }
  // }, [url, isUnlogined, isLogined]);

  // const handleChangeUrl = (event: RouterOnChangeArgs) => {
  //   setUrl(event.url);
  // };

  return (
    <HostLayout>
      <div id="preact_root" className="h-full">
        <AppLayout>
          <BrowserRouter>
            <Routes>
              {/*<ProfilePage path={PROFILE_TEMPLATE.path} />*/}
              <Route element={<ProfilePage />} path={PROFILE_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.path} />
              {/*<SignUpPage path={SIGN_UP_TEMPLATE.path} />*/}
              <Route element={<SignUpPage />} path={SIGN_UP_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.path} />
              {/*<SignInPage path={SIGN_IN_TEMPLATE.path} />*/}
              <Route element={<SignInPage />} path={SIGN_IN_REDIRECT_CREATE_APPLICATIONS_TEMPLATE.path} />
              {/*<Route element={<MyApplicationsPage />} path={MY_APPLICATIONS_TEMPLATE.path} />*/}
              {/*<Route element={<CreateApplication />} path={CREATE_APPLICATIONS_TEMPLATE.path} />*/}
              {/*<Route element={}></Route>*/}
              {/*<NewApplication path={NEW_APPLICATION_TEMPLATE.path} />*/}
              {/*<SettingsPage path={SETTINGS_TEMPLATE.path} />*/}
              {/*<NotFoundPage default />*/}
            </Routes>
          </BrowserRouter>
        </AppLayout>
        <Notification />
      </div>
    </HostLayout>
  );
};
