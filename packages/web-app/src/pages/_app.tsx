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
import { EditorState } from "draft-js";

function MyApp({ Component, pageProps, globalSettings }: AppProps & { globalSettings: GlobalSettingsDto }) {
  const router = useRouter();
  let { urls, title, module } = pageProps;
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
  // const appProps = await App.getInitialProps(appContext);
  // return appProps;
  const globalSettings = await siteApi.sendRequest(`global/ql/${appContext.router.query["lang"]}`);
  const data = {
    header: {
      headerTopLink: [],
      headerSocialLink: [],
      headerBottomLink: [],
    },
    requestForm: {
      requestFormTitle: "",
      requestFormLeftTitle: "",
      requestFormRightTitle: "",
      requestFormPostScriptText: "",
    },
    footer: {
      footerTopLink: [],
      footerLinkList: [],
      footerContactText: "",
      footerSocialLink: [],
    },
  };

  return { globalSettings: globalSettings ?? data };
};

export default MyApp;
