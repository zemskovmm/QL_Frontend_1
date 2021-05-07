import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { useIntl } from "react-intl";
import { FooterDataDto } from "src/interfaces/footerDataDto";
import {LocalizedLink} from "src/components/LocalizedLink";

export const MainFooter = (props: FooterDataDto) => {
  const lang = useIntl().locale;
  return (
    <div className="bg-blue-500 text-white">
      {props.links.map((group) => (
        <div>
          <LocalizedLink className="font-bold" link={group.group}/>
          <div className="ml-4">
            {group.items.map(link=><div><LocalizedLink link={link}/></div>)}
          </div>

        </div>
      ))}
    </div>
  );
};
