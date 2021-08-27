import type { AppContext, AppProps } from "next/app";
import "src/styles/global.css";
import "src/styles/legacy.css";
import { MainLayout } from "src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import footerData from "src/hardcoded/footerData";
import headerData from "src/hardcoded/headerData";
import { getLanguageUrlsFromRouterState } from "src/locales/locales";
import React from "react";
import { AppComponentHost } from "src/components/AppComponentHost";
import App from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let { urls, title, module } = pageProps;
  if (urls == null) urls = getLanguageUrlsFromRouterState(router);

  return (
    <>
      <AppComponentHost headTitle={title} headMeta={module?.page?.Metadata?.meta}>
        <MainLayout header={headerData} footer={footerData} urls={urls}>
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
  return appProps;
};

export default MyApp;
