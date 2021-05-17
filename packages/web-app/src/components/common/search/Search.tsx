import {CatalogWidget, ServerCatalogWidget} from "src/components/catalog/catalogWidget";
import {housingCatalogFilters} from "src/hardcoded/housingCatalogFilters";

import styles from "src/components/common/search/Search.module.css"

interface SearchProps {
  title?: string
  children: any
}

const Search = ({title, children}: SearchProps) => (
  <div className={styles.Search}>

    <div className="flex flex-col items-start max-w-screen-xl w-full my-0 mx-auto py-6 px-10">
      <h1>{title}</h1>
      {children}
    </div>
  </div>
)

  // <br />
  {/*<pre>{JSON.stringify(props)}</pre>*/}


export default Search;
