import React from "react";
import { Breadcrumbs } from "src/components/ui/Breadcrumbs/breadcrumbs";

import styles from "src/components/common/search/Search.module.css";

interface SearchProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  background?: string;
  breadcrumbs?: {
    url: string;
    title: string;
  }[];
}

const Search = ({ title, children, className, background, breadcrumbs }: SearchProps) => (
  <div
    className={styles.Search + ` ${breadcrumbs ? styles.SearchPadding__breadcrumbs : styles.SearchPadding}`}
    style={{ backgroundImage: `url(${background})` }}
  >
    {breadcrumbs && (
      <div className={`mb-10 max-w-screen-xl w-full mx-auto px-10`}>
        <Breadcrumbs items={breadcrumbs} />
      </div>
    )}
    <div className="flex flex-col items-start max-w-screen-xl w-full my-0 mx-auto px-10">
      <h1>{title}</h1>
      <div className={`${className} ${styles.SearchBlock}`}>{children}</div>
    </div>
  </div>
);

// <br />
{
  /*<pre>{JSON.stringify(props)}</pre>*/
}

export default Search;
