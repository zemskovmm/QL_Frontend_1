import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import Link from "next/link";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import { LocalizedText } from "src/components/common/LocalizedText";
import Logo from "src/assets/images/logo.png";
import LogoMob from "src/assets/images/logoMob.svg";
import CloseIcon from "src/assets/icons/cross-remove.svg";
import Menu from "src/assets/icons/menu.svg";
import { default as Social } from "src/assets/icons/social";
import { LangChooser } from "src/components/common/langChooser/langChooser";
import IconMagnify from "src/assets/icons/IconMagnify";
import styles from "./main.module.css";
import cn from "classnames";
import headerData from "../../hardcoded/headerData";
import React, { FC, useState } from "react";
import { LocalizedLinkLocale } from "../../interfaces/localizedLinkDto";

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
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header id="header" className="flex flex-col">
      <div className="shadow w-full">
        <nav
          className={
            "flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-6 px-10 " + styles.mobilePadding
          }
        >
          <div className="flex">
            <Link href={`/${lang}`}>
              <a>
                <img className="mr-6 cursor-pointer hidden lg:block" src={Logo} alt="Quartier Latin" />
                <img className="mr-6 cursor-pointer lg:hidden" src={LogoMob} alt="Quartier Latin" />
              </a>
            </Link>
            <ul className="hidden lg:flex list-none ">
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
            <div className="hidden lg:flex justify-end items-center mr-4">
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
            <div className="ml-2 md:ml-2.5">
              <ContactUsFormButton>
                <LocalizedText id="contactUs_title" />
              </ContactUsFormButton>
            </div>
            <div
              className={
                "bg-bgprimary rounded-primary cursor-pointer flex-shrink-0 p-2.5 ml-2 md:ml-2.5 flex items-center text-secondary " +
                styles.btnSearch
              }
            >
              <IconMagnify />
            </div>
            <div className={"ml-2 md:ml-2.5"}>
              <LangChooser lang={lang} urls={props.urls} />
            </div>
            <button onClick={() => setMenuOpen(true)} className={styles.btnMenu + " lg:hidden ml-2"}>
              <img src={Menu} alt="Menu" />
            </button>
          </div>
        </nav>
      </div>
      <div className="hidden lg:flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-1 px-10">
        {headerData[lang].offers.map(({ url, title }, i) => (
          <Link key={i + "headLink"} href={url}>
            <a className={cn(styles.header_offer, "py-5 whitespace-nowrap text-center")}>
              {title[0].toUpperCase() + title.slice(1, title.length).toLowerCase()}
            </a>
          </Link>
        ))}
      </div>
      {menuOpen && (
        <MobileMenu
          close={() => setMenuOpen(false)}
          linkTop={props.data[lang].links}
          linkBottom={props.data[lang].offers}
          linkSocial={props.data[lang].social}
        />
      )}
    </header>
  );
};

type MobileMenuProps = {
  close: () => void;
  linkTop: LocalizedLinkLocale[];
  linkBottom: LocalizedLinkLocale[];
  linkSocial?: LocalizedLinkLocale[];
};

export const MobileMenu: FC<MobileMenuProps> = ({ close, linkBottom, linkTop, linkSocial }) => {
  return (
    <div className={styles.mobileMenu}>
      <button className={styles.mobileMenu__close} onClick={() => close()}>
        <img src={CloseIcon} alt="Close" />
      </button>
      <div className={`flex flex-col`}>
        {linkTop.map((l, index) => (
          <li key={index + l.url} className={"uppercase flex " + styles.mobileMenu__topLink}>
            <a className="text-xs font-bold hover:text-hover" href={l.url}>
              {l.title}
            </a>
          </li>
        ))}
      </div>
      <div className={`flex flex-col`}>
        {linkBottom.map(({ url, title }, i) => (
          <Link key={i + "headLink"} href={url}>
            <a className={styles.mobileMenu__bottomLink}>{title}</a>
          </Link>
        ))}
      </div>
      <div className={`flex mt-auto justify-between	`}>
        {linkSocial?.map(({ title, url }) => {
          return title ? (
            <a key={title + url} className={cn(styles.mobileMenu__social, styles.header_social)} href={url}>
              <Social icon={title} />
            </a>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};
