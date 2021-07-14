import { siteApi } from "src/clients/siteApiClient";
import { ClientRouteDto } from "src/interfaces/clientRouteDto";
import { PageModule } from "src/components/modules/pageModule";
import { UniversityModule } from "src/components/modules/universityModule";
import { handleLanguageAndRedirects } from "src/utilities/localeHandler";
import { AppGetServerSideProps } from "src/interfaces/AppGetServerSideProps";
import { HousingModule } from "../../components/modules/housingModule";

const GetModule = (props: ClientRouteDto) => {
  const name = props.moduleName;
  if (props.moduleName == "page") return <PageModule {...props.module.page} />;
  if (props.moduleName == "university") return <UniversityModule {...props.module} />;
  if (props.moduleName == "housing") return <HousingModule {...props.module} />;
  return <div>Error: unknown module {name}</div>;
};

const ServerRouted = (props: ClientRouteDto) => {
  return <GetModule {...props} />;
};

export const getServerSideProps: AppGetServerSideProps = async (context) => {
  const { lang, route } = context.query;
  const data = await siteApi.route(lang as string, route as string[]);

  const redirect = handleLanguageAndRedirects(context, data.urls);
  if (redirect) return redirect;

  return {
    props: data,
  };
};

export default ServerRouted;
