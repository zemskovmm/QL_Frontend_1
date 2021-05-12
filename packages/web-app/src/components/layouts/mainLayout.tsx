import { HeaderDataDto } from "src/interfaces/headerDataDto";
import { FooterDataDto } from "src/interfaces/footerDataDto";
import { MainHeader } from "src/components/layouts/mainHeader";
import {MainFooter} from "src/components/layouts/mainFooter";

export interface MainLayoutProps {
  header: {
    [key: string]: HeaderDataDto
  };
  footer: FooterDataDto;
  children: any;
  urls: { [key: string]: string };
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div>
      <MainHeader data={props.header} urls={props.urls} />
      {props.children}
      <MainFooter {...props.footer} />
    </div>
  );
};
