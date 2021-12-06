import { MessageFormatElement } from "@formatjs/icu-messageformat-parser";
import { LocalesTranslate } from "./_types";

import { cn } from "./cn";
import { en } from "./en";
import { esp } from "./esp";
import { fr } from "./fr";
import { ru } from "./ru";

export type LocaleKeys = keyof LocalesTranslate;

export const getLocaleMessages = (
  locale: string
): Record<LocaleKeys, string> | Record<LocaleKeys, MessageFormatElement[]> => {
  if (locale == "ru") return ru;
  if (locale == "fr") return fr;
  if (locale == "esp") return esp;
  if (locale == "cn") return cn;
  return en;
};

export const getLocaleTranslete = (locale: string) => {
  if (locale == "ru") return ru;
  if (locale == "fr") return fr;
  if (locale == "esp") return esp;
  if (locale == "cn") return cn;
  return en;
};
