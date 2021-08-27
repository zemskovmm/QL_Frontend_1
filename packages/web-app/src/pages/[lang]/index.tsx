import { siteApi } from "src/clients/siteApiClient";
import { ClientRouteDto } from "src/interfaces/clientRouteDto";
import { PageModule } from "src/components/modules/pageModule";
import { UniversityModule } from "src/components/modules/universityModule";
import { CourseModule } from "src/components/modules/courseModule";
import { handleLanguageAndRedirects } from "src/utilities/localeHandler";
import { AppGetServerSideProps } from "src/interfaces/AppGetServerSideProps";

//TODO: remove ASAP
const GetModule = (props: ClientRouteDto) => {
  const name = props.moduleName;
  if (props.moduleName == "page") return <PageModule {...props.module.page} />;
  if (props.moduleName == "university") return <UniversityModule {...props.module} />;
  if (props.moduleName == "course") return <CourseModule {...props.module} />;
  return <div>Error: unknown module {name}</div>;
};

const ServerRouted = (props: ClientRouteDto) => {
  return <GetModule {...props} />;
};

export const getServerSideProps: AppGetServerSideProps = async (context) => {
  let { lang } = context.query;
  const data = await siteApi.route(lang as string, ["main"]);

  const redirect = handleLanguageAndRedirects(context, data.urls);
  if (redirect) return redirect;

  return {
    props: data,
  };
};

export default ServerRouted;
