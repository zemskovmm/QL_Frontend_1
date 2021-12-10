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
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./constants";
import { useEffect } from "react";
import { useUserStatuseStore } from "./stores/UserStatuseStore";
import SettingsPage from "./routes/SettingsPage";
import NewApplication from "./routes/NewApplication";
import MyApplicationsPage from "./routes/MyApplicationsPage";
import CreateApplication from "./routes/CreateApplication";
import { FormBuilderProvider } from "@project/components/src/FormBuilderBlocks/FormBuilderProvider";
import { useGlobalSettingsStore } from "./stores/GlobalSettingsStore";
import { useLocation, Navigate } from "react-router-dom";
import { useLocalized } from "./locales";
import { SecureRoute } from "./components/secure-route";

const UpdateGlobalStores: FC = () => {
  const { heartbeatAction } = useUserStatuseStore();
  const { getGlobalSettings } = useGlobalSettingsStore();
  const { lang } = useLocalized();
  const location = useLocation();

  useEffect(() => {
    getGlobalSettings(lang);
  }, [lang]);

  useEffect(() => {
    heartbeatAction();
  }, [location]);

  return <></>;
};

export const Application: FC = () => {
  return (
    <FormBuilderProvider>
      <div id="react_root" className="h-full">
        <AppLayout>
          <Routes>
            <Route element={<SignUpPage />} path={SIGN_UP_ROUTE} />
            <Route element={<SignInPage />} path={SIGN_IN_ROUTE} />
            <Route element={<CreateApplication />} path={CREATE_APPLICATIONS_ROUTE} />
            <Route element={<CreateApplication />} path={CREATE_COMPLITE_APPLICATIONS_ROUTE} />
            <Route element={<NewApplication />} path={NEW_APPLICATION_ROUTE} />
            <Route
              path={PROFILE_ROUTE}
              element={
                <SecureRoute>
                  <ProfilePage />
                </SecureRoute>
              }
            />
            <Route
              path={MY_APPLICATIONS_ROUTE}
              element={
                <SecureRoute>
                  <MyApplicationsPage />
                </SecureRoute>
              }
            />
            <Route
              path={SETTINGS_ROUTE}
              element={
                <SecureRoute>
                  <SettingsPage />
                </SecureRoute>
              }
            />
            <Route path={"/"} element={<Navigate to={PROFILE_ROUTE} />} />
            <Route path={"*"} element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
        <UpdateGlobalStores />
        <Notification />
      </div>
    </FormBuilderProvider>
  );
};

export default Application;
