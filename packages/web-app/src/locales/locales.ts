import en from "./en";
import cn from "./cn";
import ru from "./ru";
import fr from "./fr";
import esp from "./esp";
import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { NextRouter } from "next/router";
import { buildQueryString } from "src/utilities/utils";

type EngLocaleKeys = keyof typeof en;
export type LocaleKeys = EngLocaleKeys;
export type LocaleDefinition = {
  [key in keyof typeof en]: string;
};

export const supportedLocales = ["en", "fr", "ru", "cn", "esp"];

export function getLocaleMessages(locale: string): Record<string, string> | Record<string, MessageFormatElement[]> {
  if (locale == "ru") return ru;
  if (locale == "fr") return fr;
  if (locale == "esp") return esp;
  if (locale == "cn") return cn;
  return en;
}

export function getLanguageUrlsFromRouterState(router: NextRouter): { [key: string]: string } {
  const { lang, route, ...query } = router.query;
  const path = router.asPath.replace(/^\/[a-z]+\//, "");

  const urls: { [key: string]: string } = {};
  if (path === "/" + lang) {
    for (const l of supportedLocales) {
      urls[l] = "/" + l;
    }
  } else {
    for (const l of supportedLocales) {
      urls[l] = "/" + l + "/" + path;
    }
  }

  return urls;
}

export function getUrlsForStaticRoute(route: string): { [key: string]: string } {
  const urls: { [key: string]: string } = {};
  for (const l of supportedLocales) {
    urls[l] = "/" + l + "/" + route.replace(/^\//, "");
  }
  return urls;
}
