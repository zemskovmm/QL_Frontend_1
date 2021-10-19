import { MainHeader } from "src/components/layouts/mainHeader";
import { MainFooter } from "src/components/layouts/mainFooter";
import { GlobalSettingsDto } from "admin-app/src/interfaces/GlobalSettingsDto";

export interface MainLayoutProps {
  children: any;
  urls: {
    [key: string]: string;
  };
  globalSettings: GlobalSettingsDto;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div>
      <MainHeader s={props.globalSettings.header} urls={props.urls} />
      {props.children}
      <MainFooter s={props.globalSettings.footer} />
    </div>
  );
};
