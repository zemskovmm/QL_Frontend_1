//import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import { FooterDataDto } from "src/interfaces/footerDataDto";
//import {LocalizedLink} from "src/components/LocalizedLink";

import styles from './main.module.css'
import cn from "classnames";
import Logo from "src/assets/images/logoFooter.svg"
import Arrow from "src/assets/images/icons/arrow.svg"

export const MainFooter = (props: FooterDataDto) => {
  const lang = useIntl().locale;
  return (
    <footer className="bg-bgsecondary text-third flex flex-col">
      <div className={cn("flex justify-between max-w-screen-xl w-full my-0 mx-auto mx-8 px-2 py-16", styles.footer_menu)}>
        <div className="flex items-center">
          <img className="mr-20" src={Logo} alt="Quartier Latin" />
          <ul className="flex">
            {props[lang].headLinks.map(link=><li>
              <a className="flex mx-7 whitespace-nowrap" href={link.link.url}>
                <img className="mr-3" src={link.icon} alt="" />
                {link.link.title}
              </a>
            </li>)}
          </ul>
        </div>
        <a className={styles.footer_arrow} href="#header">
          <img src={Arrow} alt="" />
        </a>
      </div>
      <div className="flex flex-wrap max-w-screen-xl w-full my-0 mx-auto px-10 pt-14">
        {props[lang].links.map(({group, items}) => (
          <div className={cn("w-1/3", styles.footer_column)}>
            <a className="font-bold" href={group.url}>{group.title}</a>
            <ul className="flex flex-col">
              {items.map(link=>link.title ? <li><a href={link.url}>{link.title}</a></li> : '')}
            </ul>
          </div>
        ))}
        <div className={cn("w-1/3", styles.footer_column, styles.footer_address)}>
          <ul className="flex flex-col font-bold">
            <li>10 rue de la Lune</li>
            <li>75002 Paris</li>
            <li>+33 144 829 031</li>
            <li>Contact@quartier-latin.com</li>
            <li>Skype: QuartierLatinRU</li>
          </ul>

        </div>
      </div>
    </footer>
  );
};
