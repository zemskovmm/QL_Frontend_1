import { LangsTranslate } from "./_types";
import { cn } from "./cn";
import { en } from "./en";
import { esp } from "./esp";
import { fr } from "./fr";
import { ru } from "./ru";

export const DEFAULT_LANG = "en";
export const LANGS_TRANSLATE:LangsTranslate = { en, ru, cn, fr, esp}

export const LANGS_VARIANT = Object.keys(LANGS_TRANSLATE);
