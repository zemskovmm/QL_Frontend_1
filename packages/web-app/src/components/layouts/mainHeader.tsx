import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
//import { supportedLocales } from "src/locales/locales";
//import { AllLanguages } from "@project/components/src/utils/langs";
//import { useRouter } from "next/router";
import Link from "next/link";
import {ContactUsFormButton} from "src/components/common/contactUsForm/contactUsForm";
import {LocalizedText} from "src/components/common/LocalizedText";


import Logo from "src/assets/images/logo.png"
import {default  as Social} from "src/assets/icons/social";
import {LangChooser} from "src/components/common/langChooser/langChooser";
import IconMagnify from "src/assets/icons/IconMagnify";

//import {defaults} from "autoprefixer";

import styles from './main.module.css'
import cn from "classnames";

export interface MainHeaderProps {
  data: {
    [key: string]: HeaderDataDto
  };
  urls: string []
}

export const MainHeader = (props: MainHeaderProps) => {
  const lang = useIntl().locale;

  return (
    <header className="flex flex-col">
      <div className="shadow w-full">
        <nav className="flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
          <div className="flex">
            <img className="mr-6" src={Logo} alt="Quartier Latin" />
            <ul className="list-none flex">
              {props.data[lang].links.map((l) => (
                <li className="mx-4 uppercase flex items-center">
                  <a className="text-xs font-bold hover:text-hover" href={l.url}>
                    {l.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="flex justify-end items-center mr-4">
              {props.data[lang].social?.map(({title, url}) => {
                return title
                  ? <a className={cn("mx-3 cursor-pointer", styles.social_header)} href={url}><Social icon={title} /></a>
                  : ''
              })}
            </div>
            <div className="ml-2.5">
              <ContactUsFormButton><LocalizedText id="contactUs_title"/></ContactUsFormButton>
            </div>
            <div className="bg-bgprimary rounded-primary cursor-pointer flex-shrink-0 p-2.5 ml-2.5 flex items-center text-secondary">
              <IconMagnify />
            </div>
            <div className="m-2.5">
              <LangChooser lang={lang} urls={props.urls} />
            </div>
          </div>
        </nav>
      </div>
      <div className="flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
        <Link href={`/${lang}`}>[Main]</Link>
        <Link href={`/${lang}/education`}>[Education]</Link>
        <Link href={`/${lang}/catalog/university`}>[Catalog]</Link>
      </div>
    </header>

  );
};
