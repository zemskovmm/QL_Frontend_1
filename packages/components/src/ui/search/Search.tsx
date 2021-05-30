import React from "react";

import styles from "./Search.module.css";
import {ApiBaseUrl} from "../../api/apiClientBase";

interface SearchProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  background?: number | null;
  callback?: boolean;
  breadcrumbs?: {
    url: string;
    title: string;
  }[];
}

const Search = ({ title, children, className, background, breadcrumbs, callback }: SearchProps) => (
  <div
    className={styles.Search + ` ${breadcrumbs ? styles.SearchPadding__breadcrumbs : styles.SearchPadding}`}
    style={{ backgroundImage: `url(${ApiBaseUrl}/api/media/${background})` }}
  >
    <div className={`flex items-start max-w-screen-xl w-full my-0 mx-auto px-10 ${callback ? "flex-row" : "flex-col"}`}>
      <h1>{title}</h1>
      <div className={`${className}  ${callback ? "flex ml-auto" : styles.SearchBlock}`}>{children}</div>
    </div>
  </div>
);

// <br />
{
  /*<pre>{JSON.stringify(props)}</pre>*/
}

export default Search;
