import type { AppContext, AppProps } from "next/app";
import "src/styles/global.css";
import { MainLayout } from "src/components/layouts/mainLayout";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import footerData from "src/hardcoded/footerData";
import headerData from "src/hardcoded/headerData";
import {getLanguageUrlsFromRouterState, getLocaleMessages} from "src/locales/locales";
import {useEffect} from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const lang = router.query.lang;
  let {urls} = pageProps;
  if (lang == null)
    return <div>404 - not found</div>;
  if(urls == null)
    urls = getLanguageUrlsFromRouterState(router);

  return (
    <IntlProvider locale={lang as string} defaultLocale="en" messages={getLocaleMessages(lang as string)}>
      <MainLayout header={headerData} footer={footerData} urls={urls}>
        <Component {...pageProps} />
      </MainLayout>
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
