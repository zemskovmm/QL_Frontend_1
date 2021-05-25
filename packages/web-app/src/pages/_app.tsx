import type { AppProps } from "next/app";
import "src/styles/global.css";
import { MainLayout } from "src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import footerData from "src/hardcoded/footerData";
import headerData from "src/hardcoded/headerData";
import { getLanguageUrlsFromRouterState } from "src/locales/locales";
import React from "react";
import { AppComponentHost } from "src/components/AppComponentHost";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  let { urls } = pageProps;
  if (urls == null) urls = getLanguageUrlsFromRouterState(router);

  return (
    <AppComponentHost>
      <MainLayout header={headerData} footer={footerData} urls={urls}>
        <Component {...pageProps} />
      </MainLayout>
    </AppComponentHost>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic assets optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
