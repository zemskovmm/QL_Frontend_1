import { FunctionalComponent } from "preact";
import { AppLayout } from "layouts/AppLayout";
import { Notification } from "components/Notification";
import Router, { Route, route, RouterOnChangeArgs } from "preact-router";
import HomePage from "routes/HomePage";
import SignUpPage from "routes/SignUpPage";
import SignInPage from "routes/SignInPage";
import NotFoundPage from "routes/NotFoundPage";
import ProfilePage from "routes/ProfilePage";
import {
  useRouterStore,
  HOME_TEMPLATE,
  SIGN_UP_TEMPLATE,
  SIGN_IN_TEMPLATE,
  PROFILE_TEMPLATE,
  SETTINGS_TEMPLATE,
  NEW_APPLICATION_TEMPLATE,
  MY_APPLICATIONS_TEMPLATE,
} from "stores/RouterStore";
import { useEffect, useState } from "preact/hooks";
import { useUserStatuseStore } from "stores/UserStatuseStore";
import { isSecureUrl } from "stores/RouterStore/_utils";
import SettingsPage from "routes/SettingsPage";
import { useLocalesStore } from "stores/LocalesStore";
import { changeLangInUrl, DEFAULT_LANG, urlToLang } from "locales/utils";
import { HostLayout } from "layouts/HostLayout";
import NewApplication from "routes/NewApplication";
import MyApplicationsPage from "routes/MyApplicationsPage";

export const Application: FunctionalComponent = () => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const { changeUrl, HOME_PATH } = useRouterStore();
  const { changeLang } = useLocalesStore();
  const { isUnlogined } = useUserStatuseStore();
  const { heartbeatAction } = useUserStatuseStore();

  useEffect(() => {
    if (url !== undefined && isUnlogined && isSecureUrl(url)) {
      route(HOME_PATH, true);
    }
  }, [url, isUnlogined, HOME_PATH]);

  useEffect(() => {
    if (url !== undefined) {
      if (url === "" || url === "/") {
        route(HOME_TEMPLATE.getRoute({ lang: DEFAULT_LANG }), true);
        return;
      }
      const lang = urlToLang(url);
      if (!lang) {
        route(changeLangInUrl(url, DEFAULT_LANG), true);
        return;
      }
      changeUrl(url);
      changeLang(lang || DEFAULT_LANG);
      heartbeatAction();
    }
  }, [url]);

  const handleChangeUrl = (event: RouterOnChangeArgs) => {
    setUrl(event.url);
  };

  return (
    <HostLayout>
      <div id="preact_root" className="h-full">
        <AppLayout>
          <Router onChange={handleChangeUrl}>
            <HomePage path={HOME_TEMPLATE.path} />
            <ProfilePage path={PROFILE_TEMPLATE.path} />
            <SignUpPage path={SIGN_UP_TEMPLATE.path} />
            <SignInPage path={SIGN_IN_TEMPLATE.path} />
            <Route component={MyApplicationsPage}  path={MY_APPLICATIONS_TEMPLATE.path} />
            <NewApplication path={NEW_APPLICATION_TEMPLATE.path} />
            <SettingsPage path={SETTINGS_TEMPLATE.path} />
            <NotFoundPage default />
          </Router>
        </AppLayout>
        <Notification />
      </div>
    </HostLayout>
  );
};
