import type { AppContext, AppProps } from "next/app";
import "src/styles/global.css";
import { MainLayout } from "src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import footerData from "src/hardcoded/footerData";
import headerData from "src/hardcoded/headerData";
import { getLanguageUrlsFromRouterState, getLocaleMessages } from "src/locales/locales";
import React from "react";
import { AppContextS } from "@project/components/src/blocks";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const lang = router.query.lang || "en";
  let { urls } = pageProps;
  if (urls == null) urls = getLanguageUrlsFromRouterState(router);

  return (
    <IntlProvider locale={lang as string} defaultLocale="en" messages={getLocaleMessages(lang as string)}>
      <AppContextS.Provider value={{ showContactUsForm: () => console.log("user") }}>
        <MainLayout header={headerData} footer={footerData} urls={urls}>
          <Component {...pageProps} />
        </MainLayout>
      </AppContextS.Provider>
    </IntlProvider>
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
