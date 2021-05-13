//import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import { FooterDataDto } from "src/interfaces/footerDataDto";
//import {LocalizedLink} from "src/components/LocalizedLink";

export const MainFooter = (props: FooterDataDto) => {
  const lang = useIntl().locale;
  return (
    <div className="bg-blue-500 text-white">
      {props[lang].links.map(({group, items}) => (
        <div>
          <a className="font-bold" href={group.url}>{group.title}</a>
          <div className="ml-4">
            {items.map(link=><a href={link.url}>{link.title}</a>)}
          </div>
        </div>
      ))}
    </div>
  );
};
