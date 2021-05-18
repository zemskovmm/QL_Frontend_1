import {CatalogWidget, ServerCatalogWidget} from "src/components/catalog/catalogWidget";
import {housingCatalogFilters} from "src/hardcoded/housingCatalogFilters";

import styles from "src/components/common/search/Search.module.css"

interface SearchProps {
  title?: string
  children: any,
  className?: string
}

const Search = ({title, children, className}: SearchProps) => (
  <div className={styles.Search}>
    <div className="flex flex-col items-start max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
      <h1>{title}</h1>
      <div className={className}>
        {children}
      </div>
    </div>
  </div>
)

  // <br />
  {/*<pre>{JSON.stringify(props)}</pre>*/}


export default Search;
