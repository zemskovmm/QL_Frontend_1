//import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import { FooterDataDto } from "src/interfaces/footerDataDto";
//import {LocalizedLink} from "src/components/LocalizedLink";

export const MainFooter = (props: FooterDataDto) => {
  const lang = useIntl().locale;
  return (
    <div className="bg-bgsecondary text-third flex flex-col">
      <div className="flex flex-wrap items-center max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
        {props[lang].links.map(({group, items}) => (
          <div className="w-1/3">
            <a className="font-bold" href={group.url}>{group.title}</a>
            <ul className="flex flex-col">
              {items.map(link=><a href={link.url}>{link.title}</a>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
