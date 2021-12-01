import * as React from "react";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { Notification } from "./components/Notification";
import SignUpPage from "./routes/SignUpPage";
import SignInPage from "./routes/SignInPage";
import NotFoundPage from "./routes/NotFoundPage";
import ProfilePage from "./routes/ProfilePage";
import {
  CREATE_APPLICATIONS_ROUTE,
  MY_APPLICATIONS_ROUTE,
  PROFILE_ROUTE, SETTINGS_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE,
} from "./constants";
import { useEffect } from "react";
import { useUserStatuseStore } from "./stores/UserStatuseStore";
import SettingsPage from "./routes/SettingsPage";
import NewApplication from "./routes/NewApplication";
import MyApplicationsPage from "./routes/MyApplicationsPage";
import CreateApplication from "./routes/CreateApplication";
import { HostLayout } from "@project/components/src/FormBuilderBlocks/HostLayout";
import { useGlobalSettingsStore } from "./stores/GlobalSettingsStore";
import { useLocation,useNavigate} from "react-router-dom";
import { LocalesContextProvider, useLocalized } from "./locales";


const InitStores:FC = ({children})=>{
  const { getGlobalSettings } = useGlobalSettingsStore();
  const {lang} = useLocalized()

  useEffect(()=>{
    getGlobalSettings(lang);
  },[lang])

  return <>{children}</>
}

export const Application: FC = () => {
  const { heartbeatAction } = useUserStatuseStore();
  const location = useLocation();
  const navigate = useNavigate()
  
  useEffect(() => {
    const url = location.pathname
    if(!url || url==='/'){
      navigate(PROFILE_ROUTE);
    }
    heartbeatAction();
  }, [location])

  return (
    <LocalesContextProvider>
      <HostLayout>
        <InitStores>
          <div id="react_root" className="h-full">
            <AppLayout>
              <Routes>
                <Route element={<ProfilePage />} path={PROFILE_ROUTE} />
                <Route element={<SignUpPage />} path={SIGN_UP_ROUTE} />
                <Route element={<SignInPage />} path={SIGN_IN_ROUTE} />
                <Route element={<MyApplicationsPage />} path={MY_APPLICATIONS_ROUTE} />
                <Route element={<CreateApplication />} path={CREATE_APPLICATIONS_ROUTE} />
                <Route element={<CreateApplication />} path={CREATE_APPLICATIONS_ROUTE} />
                <Route element={<SettingsPage />} path={SETTINGS_ROUTE} />
                {/*<NewApplication path={NEW_APPLICATION_TEMPLATE.path} />*/}
                <Route path={"*"} element={<NotFoundPage />} />
              </Routes>
            </AppLayout>
            <Notification />
          </div>
        </InitStores>
      </HostLayout>
    </LocalesContextProvider>
  );
};

export default Application;


