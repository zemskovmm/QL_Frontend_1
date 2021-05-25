import React, { useState } from "react";
import { ComponentHostContext, IComponentHost } from "@project/components/src/blocks";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { getLocaleMessages } from "../locales/locales";
import { ContactUsFormController } from "./common/contactUsForm/contactUsForm";

export const AppComponentHost: React.FC = ({ children }) => {
  const [isContactUsFormShown, setContactUsFormShown] = useState(false);
  const host: IComponentHost = {
    showContactUsForm: () => setContactUsFormShown(true),
  };
  const router = useRouter();
  const lang = router.query.lang || "en";
  return (
    <IntlProvider locale={lang as string} defaultLocale="en" messages={getLocaleMessages(lang as string)}>
      <ComponentHostContext.Provider value={host}>
        {children}
        {isContactUsFormShown ? <ContactUsFormController onDismiss={() => setContactUsFormShown(false)} /> : null}
      </ComponentHostContext.Provider>
    </IntlProvider>
  );
};
