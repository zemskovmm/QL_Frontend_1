import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import { supportedLocales } from "src/locales/locales";
import { AllLanguages } from "@project/components/src/utils/langs";
import { useRouter } from "next/router";
import Link from "next/link";
import {ContactUsFormButton} from "src/components/common/contactUsForm";
import {LocalizedText} from "src/components/common/LocalizedText";

export interface MainHeaderProps {
  data: HeaderDataDto;
  urls: { [key: string]: string };
}

export const MainHeader = (props: MainHeaderProps) => {
  const lang = useIntl().locale;
  const router = useRouter();
  return (
    <div className="bg-blue-500 text-white mb-4">
      Quartier Latin
      <div>
        {props.data.links.map((l) => (
          <a className="m-1" href={l[lang].url}>
            {l[lang].title}
          </a>
        ))}
      </div>
      <select
        className="text-black"
        value={lang}
        onChange={(e) => {
          const newLang = e.target.value;
          if (props.urls.hasOwnProperty(newLang)) {
            router.push(props.urls[newLang]);
          }
          else
            router.push("/" + newLang);
        }}
      >
        {supportedLocales.map((l) => (
          <option value={l}>{AllLanguages[l].title}</option>
        ))}
      </select>
      <ContactUsFormButton><LocalizedText id="contactUs_title"/></ContactUsFormButton>
      <div>
        Test:
        <Link href={`/${lang}`}>[Main]</Link>
        <Link href={`/${lang}/education`}>[Education]</Link>
        <Link href={`/${lang}/catalog/university`}>[Catalog]</Link>
      </div>
    </div>
  );
};
