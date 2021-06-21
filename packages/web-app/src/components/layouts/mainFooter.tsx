import { useIntl } from "react-intl";
import { FooterDataDto } from "src/interfaces/footerDataDto";
import styles from "./main.module.css";
import cn from "classnames";
import Logo from "src/assets/images/logoFooter.svg";
import Arrow from "src/assets/images/icons/arrow.svg";
import { default as Social } from "src/assets/icons/socialFooter";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import React, { useState } from "react";

export const MainFooter = (props: FooterDataDto) => {
  const lang = useIntl().locale;
  const [activeTab, setActiveTab] = useState("");
  return (
    <footer className="bg-bgsecondary text-third flex flex-col">
      <div
        className={cn(
          "flex justify-between max-w-screen-xl w-full my-0 mx-auto px-4 lg:px-10 py-6 lg:py-16",
          styles.footer_menu
        )}
      >
        <div className="flex flex-col lg:flex-row lg:items-center mt-2">
          <img className="mb-10 lg:mr-20" src={Logo} alt="Quartier Latin" />
          <ul className="flex flex-col lg:flex-row">
            {props[lang].headLinks.map((link, i) => (
              <li key={i + "footerHeadLink"}>
                <a className={cn("flex lg:mx-7 whitespace-nowrap font-bold text-xs mb-5")} href={link.link.url}>
                  <img className="mr-3" src={link.icon} alt="" />
                  <span className={styles.footer_linkspan}>
                    {link.link.title.toLowerCase() === "faq"
                      ? link.link.title.toUpperCase()
                      : link.link.title.toLowerCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a className={styles.footer_arrow} href="#header">
          <img src={Arrow} alt="" />
        </a>
      </div>
      <div className="flex flex-wrap max-w-screen-xl w-full my-0 lg:mx-auto lg:px-10 py-0 lg:pt-14">
        {props[lang].links.map(({ group, items }, index) => (
          <div
            key={index + "MainFooter"}
            className={cn(
              "w-full lg:w-1/3",
              styles.footer_column,
              activeTab === `${index}MainFooter` ? styles.openFooterTab : styles.closeFooterTab
            )}
            onClick={() =>
              window.innerWidth >= 1024
                ? ""
                : activeTab === `${index}MainFooter`
                ? setActiveTab("")
                : setActiveTab(index + "MainFooter")
            }
          >
            <a className="font-bold mr-auto" href={group.url}>
              {group.title}
            </a>
            <ul className="flex flex-col overflow-hidden">
              {items.map((link, i) =>
                link.title ? (
                  <li key={i + "MainFooterLink"}>
                    <a href={link.url}>{link.title}</a>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
        ))}
        <div className={cn("w-full lg:w-1/3", styles.footer_column, styles.footer_address)}>
          <ul className="flex flex-col font-bold">
            <li>10 rue de la Lune 75002 Paris</li>
            <li>+33 144 829 031</li>
            <li>contact@quartier-latin.com</li>
            <li>Skype: QuartierLatinRU</li>
            <li>WhatsApp: +33 6 26 63 86 27</li>
          </ul>
          {props[lang].writeUs && (
            <ContactUsFormButton className={styles.footer_writeus} footer={true}>
              {props[lang].writeUs}
            </ContactUsFormButton>
          )}
          <div className={styles.footer_social}>
            {props[lang].socials.map((link, i) =>
              link.title ? (
                <a key={i + "footerSocial"} href={link.url}>
                  <Social icon={link.title} />
                </a>
              ) : (
                ""
              )
            )}
          </div>
          {lang === "cn" && (
            <img src="/WeChat.jpg" alt="" className={`w-full pl-6 mb-10`} style={{ maxWidth: "240px" }} />
          )}
        </div>
      </div>
    </footer>
  );
};
