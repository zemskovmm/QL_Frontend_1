import React from "react";
import { GetServerSideProps } from "next";
import parser from "accept-language-parser";
import {supportedLocales} from "src/locales/locales";

const Index = () => <div>Redirecting...</div>;

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  var lang = "en";
  if (context.req) {
    const acceptLanguage = context.req.headers["accept-language"];
    if (acceptLanguage != null)
      lang = parser.pick(supportedLocales, acceptLanguage) || lang;
  }

  return {
    redirect: {
      permanent: false,
      destination: "/" + lang,
    }
  };
};
