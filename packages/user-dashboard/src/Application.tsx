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
  CREATE_COMPLITE_APPLICATIONS_ROUTE,
  MY_APPLICATIONS_ROUTE,
  NEW_APPLICATION_ROUTE,
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
import { useLocation} from "react-router-dom";
import { useLocalized } from "./locales";
import ProtectedRoute from "./components/protected-route/protected-route";


const UpdateGlobalStores:FC = () =>{
  const { heartbeatAction } = useUserStatuseStore();
  const { getGlobalSettings } = useGlobalSettingsStore();
  const {lang} = useLocalized()
  const location = useLocation()

  useEffect(()=>{
    getGlobalSettings(lang);
  },[lang])
  
  useEffect(() => {
    heartbeatAction();
  }, [location])

  return <></>
}

export const Application: FC = () => {
  
  return (
      <HostLayout>
          <div id="react_root" className="h-full">
            <AppLayout>
              <Routes >
                <Route element={<SignUpPage />} path={SIGN_UP_ROUTE} />
                <Route element={<SignInPage />} path={SIGN_IN_ROUTE} />
                <Route element={<CreateApplication />} path={CREATE_APPLICATIONS_ROUTE} />
                <Route element={<CreateApplication />} path={CREATE_COMPLITE_APPLICATIONS_ROUTE} />
                <Route element={<NewApplication />} path={NEW_APPLICATION_ROUTE} />
                {ProtectedRoute({element:<ProfilePage />, path:PROFILE_ROUTE, redirect:SIGN_IN_ROUTE})}
                {ProtectedRoute({element:<MyApplicationsPage />, path:MY_APPLICATIONS_ROUTE, redirect:SIGN_IN_ROUTE})}
                {ProtectedRoute({element:<SettingsPage />, path:SETTINGS_ROUTE, redirect:SIGN_IN_ROUTE})}
                <Route path={"*"} element={<NotFoundPage />} />
              </Routes>
            </AppLayout>
            <UpdateGlobalStores/>
            <Notification />
          </div>
      </HostLayout>
  );
};

export default Application;


