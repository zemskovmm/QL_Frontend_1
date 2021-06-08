import React, { useState } from "react";
import { ComponentHostContext, IComponentHost } from "@project/components/src/blocks";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { getLocaleMessages } from "../locales/locales";
import { ContactUsFormController } from "./common/contactUsForm/contactUsForm";
import { siteApi } from "../clients/siteApiClient";
import Head from "next/head";

export const AppComponentHost: React.FC = ({ children }) => {
  const [isContactUsFormShown, setContactUsFormShown] = useState(false);
  const router = useRouter();
  const lang = router.query.lang || "en";
  const host: IComponentHost = {
    showContactUsForm: () => setContactUsFormShown(true),
    filters: siteApi,
    lang: lang as string,
  };
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>Quartier Latin</title>
        {/*<meta name="viewport" content="width=1024" />*/}
        <meta name="viewport" content="width=device-width, user-scalable=yes" />
      </Head>
      <IntlProvider locale={lang as string} defaultLocale="en" messages={getLocaleMessages(lang as string)}>
        <ComponentHostContext.Provider value={host}>
          {children}
          {isContactUsFormShown ? <ContactUsFormController onDismiss={() => setContactUsFormShown(false)} /> : null}
        </ComponentHostContext.Provider>
      </IntlProvider>
    </>
  );
};
