import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import { supportedLocales } from "src/locales/locales";
import { AllLanguages } from "@project/components/src/utils/langs";
import { useRouter } from "next/router";
import Link from "next/link";
import {ContactUsFormButton} from "src/components/common/contactUsForm";
import {LocalizedText} from "src/components/common/LocalizedText";

import Logo from "src/assets/images/logo.png"
import IconVk from "src/assets/images/socials/vk.svg";

export interface MainHeaderProps {
  data: HeaderDataDto;
  urls: { [key: string]: string };
}

export const MainHeader = (props: MainHeaderProps) => {
  const lang = useIntl().locale;
  const router = useRouter();
  return (
    <div className="shadow">
      <div className="flex justify-between max-w-screen-xl w-full my-0 mx-auto py-6 px-0">
        <div className="flex">
          <img className="mr-10" src={Logo} alt="Quartier Latin" />
          <ul className="list-none flex">
            {props.data.links.map((l) => (
              <li className="mx-6 uppercase flex items-center">
                <a className="text-xs font-bold hover:text-secondary" href={l[lang].url}>
                  {l[lang].title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <IconVk />
        <ContactUsFormButton><LocalizedText id="contactUs_title"/></ContactUsFormButton>
        <select
          className="text-black"
          value={lang}
          onChange={(e) => {
            const newLang = e.target.value;
            if (props.urls.hasOwnProperty(newLang)) {
              router.push(props.urls[newLang]);
            }
          }}
        >
          {supportedLocales.map((l) => (
            <option value={l}>{AllLanguages[l].title}</option>
          ))}
        </select>
      </div>
      <div>
        Test:
        <Link href={`/${lang}`}>[Main]</Link>
        <Link href={`/${lang}/education`}>[Education]</Link>
        <Link href={`/${lang}/catalog/university`}>[Catalog]</Link>
      </div>
    </div>
  );
};
