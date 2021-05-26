import React from "react";

import styles from "./Search.module.css";

interface SearchProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  background?: number | null;
  breadcrumbs?: {
    url: string;
    title: string;
  }[];
}

const Search = ({ title, children, className, background, breadcrumbs }: SearchProps) => (
  <div
    className={styles.Search + ` ${breadcrumbs ? styles.SearchPadding__breadcrumbs : styles.SearchPadding}`}
    style={{ backgroundImage: `url(https://ql.dotlic.ru/api/media/${background})` }}
  >
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
