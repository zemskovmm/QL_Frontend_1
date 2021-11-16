import { useIntl } from "react-intl";
import Link from "next/link";
import { ContactUsFormButton } from "src/components/common/ContactUsForm";
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
import React, { FC, useState } from "react";
import { HeaderDto, LinkDto, SocialLinkDto } from "admin-app/src/interfaces/GlobalSettingsDto";

export interface MainHeaderProps {
  urls: {
    [key: string]: string;
  };
}

export const MainHeader: FC<MainHeaderProps & { s: HeaderDto }> = ({ urls, s }) => {
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
              {s.headerTopLink.map((el, index) => (
                <li key={`headerTopLink ${index} ${el.link}`} className="mx-4 uppercase flex items-center">
                  <a className="text-xs font-bold hover:text-hover" href={el.link}>
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex justify-end items-center mr-4">
              {s.headerSocialLink.map((el, index) => {
                return el ? (
                  <a key={el.link + index} className={cn("mx-3 cursor-pointer", styles.header_social)} href={el.link}>
                    <Social icon={el.icon} />
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
              <LangChooser lang={lang} urls={urls} />
            </div>
            <button onClick={() => setMenuOpen(true)} className={styles.btnMenu + " lg:hidden ml-2"}>
              <img src={Menu} alt="Menu" />
            </button>
          </div>
        </nav>
      </div>
      <div className="hidden lg:flex justify-between items-center max-w-screen-xl w-full my-0 mx-auto py-1 px-10">
        {s.headerBottomLink.map((el, i) => (
          <Link key={`${i} headLink`} href={el.link}>
            <a className={cn(styles.header_offer, "py-5 whitespace-nowrap text-center")}>{el.name}</a>
          </Link>
        ))}
      </div>
      {menuOpen && (
        <MobileMenu
          close={() => setMenuOpen(false)}
          LinkTop={s.headerTopLink}
          LinkBottom={s.headerBottomLink}
          LinkSocial={s.headerSocialLink}
        />
      )}
    </header>
  );
};

type MobileMenuProps = {
  close: () => void;
  LinkTop: LinkDto[];
  LinkBottom: LinkDto[];
  LinkSocial: SocialLinkDto[];
};

export const MobileMenu: FC<MobileMenuProps> = ({ close, LinkBottom, LinkTop, LinkSocial }) => {
  return (
    <div className={styles.mobileMenu}>
      <button className={styles.mobileMenu__close} onClick={() => close()}>
        <img src={CloseIcon} alt="Close" />
      </button>
      <div className={`flex flex-col`}>
        {LinkTop.map((el, index) => (
          <li key={index + el.link} className={"uppercase flex " + styles.mobileMenu__topLink}>
            <a className="text-xs font-bold hover:text-hover" href={el.link} onClick={() => close()}>
              {el.name}
            </a>
          </li>
        ))}
      </div>
      <div className={`flex flex-col`}>
        {LinkBottom.map((el, i) => (
          <Link key={i + "headLink"} href={el.link}>
            <a className={styles.mobileMenu__bottomLink} onClick={() => close()}>
              {el.name}
            </a>
          </Link>
        ))}
      </div>
      <div className={`flex mt-auto justify-between	`}>
        {LinkSocial.map((el, index) => {
          return el.icon ? (
            <a key={index + el.icon} className={cn(styles.mobileMenu__social, styles.header_social)} href={el.link}>
              <Social icon={el.icon} />
            </a>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
};
