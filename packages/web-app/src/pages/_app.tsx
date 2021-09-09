import type { AppContext, AppProps } from "next/app";
import "src/styles/global.css";
import "src/styles/legacy.css";
import { MainLayout } from "src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import { getLanguageUrlsFromRouterState } from "src/locales/locales";
import React from "react";
import { AppComponentHost } from "src/components/AppComponentHost";
import App from "next/app";
import { siteApi } from "../clients/siteApiClient";
import { GlobalSettingsDto } from "admin-app/src/interfaces/GlobalSettingsDto";

function MyApp({
  Component,
  pageProps,
  appProps,
  globalSettings,
}: AppProps & { globalSettings: GlobalSettingsDto; appProps: any }) {
  const router = useRouter();
  let { urls, title, module } = appProps;
  if (urls == null) urls = getLanguageUrlsFromRouterState(router);

  return (
    <>
      <AppComponentHost
        requestSetting={globalSettings.requestForm}
        headTitle={title}
        headMeta={module?.page.Metadata?.meta}
      >
        <MainLayout globalSettings={globalSettings} urls={urls}>
          <Component {...pageProps} />
        </MainLayout>
      </AppComponentHost>
    </>
  );
}

// Technically we are supposed to fetch anything app-wide here,
// but we need to disable automatic static optimization for
// server-side locales to work
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const routeLang = appContext.router.query["lang"];
  const globalSettings = await siteApi.sendRequest(`global`, routeLang ? routeLang : "en");
  return { appProps, globalSettings };
};

export default MyApp;
