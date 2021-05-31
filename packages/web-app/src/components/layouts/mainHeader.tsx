import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
//import { supportedLocales } from "src/locales/locales";
//import { AllLanguages } from "@project/components/src/utils/langs";

import Link from "next/link";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import { LocalizedText } from "src/components/common/LocalizedText";

import Logo from "src/assets/images/logo.png";
import { default as Social } from "src/assets/icons/social";
import { LangChooser } from "src/components/common/langChooser/langChooser";
import IconMagnify from "src/assets/icons/IconMagnify";

//import {defaults} from "autoprefixer";

import styles from "./main.module.css";
import cn from "classnames";
import headerData from "../../hardcoded/headerData";

export interface MainHeaderProps {
  data: {
    [key: string]: HeaderDataDto;
  };
  urls: {
    [key: string]: string;
  };
}

export const MainHeader = (props: MainHeaderProps) => {
  const lang = useIntl().locale;
  return (
    <header id="header" className="flex flex-col">
      <div className="shadow w-full">
        <nav className="flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
          <div className="flex">
            <Link href={`/${lang}`}>
              <img className="mr-6 cursor-pointer" src={Logo} alt="Quartier Latin" />
            </Link>
            <ul className="list-none flex">
              {props.data[lang].links.map((l, index) => (
                <li key={index + l.url} className="mx-4 uppercase flex items-center">
                  <a className="text-xs font-bold hover:text-hover" href={l.url}>
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="flex justify-end items-center mr-4">
              {props.data[lang].social?.map(({ title, url }) => {
                return title ? (
                  <a key={title + url} className={cn("mx-3 cursor-pointer", styles.header_social)} href={url}>
                    <Social icon={title} />
                  </a>
                ) : (
                  ""
                );
              })}
            </div>
            <div className="ml-2.5">
              <ContactUsFormButton>
                <LocalizedText id="contactUs_title" />
              </ContactUsFormButton>
            </div>
            <div className="bg-bgprimary rounded-primary cursor-pointer flex-shrink-0 p-2.5 ml-2.5 flex items-center text-secondary">
              <IconMagnify />
            </div>
            <div className="ml-2.5">
              <LangChooser lang={lang} urls={props.urls} />
            </div>
          </div>
        </nav>
      </div>
      <div className="flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-1 px-10">
        {headerData[lang].offers.map(({ url, title }, i) => (
          <Link key={i + "headLink"} href={url}>
            <a className={cn(styles.header_offer, "py-5 whitespace-nowrap text-center")}>{title}</a>
          </Link>
        ))}
      </div>
    </header>
  );
};
