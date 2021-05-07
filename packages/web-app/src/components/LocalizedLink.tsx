import { LocalizedLinkDto } from "src/interfaces/localizedLinkDto";
import { useIntl } from "react-intl";

export const LocalizedLink = (
  props: { link: LocalizedLinkDto } & React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const locale = useIntl().locale;
  const {link, ...rest} = props;
  return <a href={link[locale].url} {...rest}>{link[locale].title}</a>;
};
