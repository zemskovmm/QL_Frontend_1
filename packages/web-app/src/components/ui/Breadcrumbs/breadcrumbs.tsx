import React, { FC } from "react";
import style from "./breadcrumbs.module.css";
import { LocaleKeys } from "src/locales/locales";
import { useLocalizedText } from "src/components/common/LocalizedText";
import { IntlShape, useIntl } from "react-intl";
import { hasOwnProperty } from "src/utilities/utils";
import Link from "next/link";

export interface LocaleBreadcrumbItem {
  url?: string;
  localeKey: LocaleKeys;
}

export interface TextBreadcrumbItem {
  url?: string;
  title: string;
}

export type BreadcrumbItem = LocaleBreadcrumbItem | TextBreadcrumbItem | string;

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

function translate(intl: IntlShape, item: BreadcrumbItem): { url?: string; title: string } {
  let link = "#";
  let title = "";
  if (typeof item === "string") {
    title = item;
  } else {
    if (item.url != null) link = item.url;
    if (hasOwnProperty(item, "title")) title = item.title;
    else title = intl.formatMessage({ id: item.localeKey });
  }
  return { url: "/" + intl.locale + link, title: title };
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const intl = useIntl();
  return (
    <div className={style.breadcrumbs}>
      {items.map((el, index) => {
        const item = translate(intl, el);
        return (
          <a href={item.url} className={style.breadcrumbs__items} key={`${index} bread`}>
            {item.title}
          </a>
        );
      })}
    </div>
  );
};
