import { Catalog } from "src/components/catalog/catalog";
import {CatalogUniversityDto} from "src/interfaces/catalogFilterDto";
import Link from "next/link";

const UniversityCatalogElement = (props: CatalogUniversityDto) => <div className="pb-2 m-4 border-b-2 border-blue-500">
  <h4><Link href={props.url}>{props.name}</Link></h4>
</div>;

const UniversityCatalogPage = () => {
  return <Catalog<CatalogUniversityDto> elementRenderer={UniversityCatalogElement} apiElementName="university" />;
};

export default UniversityCatalogPage;
