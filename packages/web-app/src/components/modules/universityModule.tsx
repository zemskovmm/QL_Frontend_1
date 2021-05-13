import { ClientUniversityDto } from "src/interfaces/clientUniversityDto";
import { CatalogInnerAbout } from "src/components/catalogInner/about/catalogInnerAbout";

export const UniversityModule = (props: ClientUniversityDto) => {
  return (
    <div>
      <CatalogInnerAbout data={props} />
    </div>
  );
};
