import { useIntl } from "react-intl";
import { FooterDataDto } from "src/interfaces/footerDataDto";
import styles from "./main.module.css";
import cn from "classnames";
import Logo from "src/assets/images/logoFooter.svg";
import Arrow from "src/assets/images/icons/arrow.svg";
import { default as Social } from "src/assets/icons/socialFooter";
import { ContactUsFormButton } from "src/components/common/contactUsForm/contactUsForm";
import React, { FC, useState } from "react";
import { FooterDto } from "admin-app/src/interfaces/GlobalSettingsDto";
import { LocalizedText } from "../common/LocalizedText";

export const MainFooter: FC<{ s: FooterDto }> = ({ s }) => {
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
            {s.footerTopLink.map((el, i) => (
              <li key={i + "footerHeadLink"}>
                <a className={cn("flex lg:mx-7 whitespace-nowrap font-bold text-xs mb-5")} href={el.link}>
                  <img className="mr-3" src={"/images/icons/chain.svg"} alt="" />
                  <span className={styles.footer_linkspan}>{el.name}</span>
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
        {s.footerLinkList.map((el, index) => (
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
            <a className={cn("font-bold mr-auto", styles.footer_title)} href={el.url}>
              {el.title}
            </a>
            <ul className="flex flex-col overflow-hidden">
              {el.list.map((link, i) =>
                link.name ? (
                  <li key={i + "MainFooterLink"}>
                    <a href={link.link}>{link.name}</a>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
        ))}
        <div className={cn("w-full lg:w-1/3", styles.footer_column, styles.footer_address)}>

          <div className="py-4">
            {s.footerContactLinkList && s.footerContactLinkList.map(({link,text,icon}, i) =>
              <div className="relative p-1 pl-6" key={i + "MainFooterContactLinkList"}>
                <a className="absolute top-1 left-0 w-5 h-5" href={link}>
                  <Social className={styles.footer_icon}  icon={icon.toLowerCase()} />
                </a>
                <a href={link}>{text}</a>
              </div>
            )}
          </div>

          {s.footerContactLinkList && (
            <ContactUsFormButton className={styles.footer_writeus} footer={true}>
              <LocalizedText id={"request_button"} />
            </ContactUsFormButton>
          )}

          <div className={styles.footer_social}>
            {s.footerSocialLink.map((el, i) =>
              el.icon ? (
                <a key={i + "footerSocial"} href={el.link}>
                  <Social icon={el.icon.toLowerCase()} />
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
