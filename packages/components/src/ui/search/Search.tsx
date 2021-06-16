import React from "react";

import styles from "./Search.module.css";
import { ApiBaseUrl } from "../../api/apiClientBase";
import cn from "classnames";

interface SearchProps {
  title?: string;
  titleColor?: "black" | "white";
  titleShadow?: boolean;
  children: React.ReactNode;
  className?: string;
  background?: number | null;
  callback?: boolean;
  breadcrumbs?: {
    url: string;
    title: string;
  }[];
}

const Search = ({
  title,
  children,
  className,
  background,
  breadcrumbs,
  callback,
  titleColor = "black",
  titleShadow = false,
}: SearchProps) => (
  <div
    className={styles.Search + ` ${breadcrumbs ? styles.SearchPadding__breadcrumbs : styles.SearchPadding}`}
    style={{ backgroundImage: `url(${ApiBaseUrl}/api/media/${background})` }}
  >
    <div
      className={`flex flex-col justify-center lg:items-start max-w-screen-xl w-full my-0 mx-auto px-4 lg:px-10 ${
        callback ? "lg:flex-row" : ""
      }`}
    >
      <h1 className={cn(titleColor === "white" ? styles.white_title : "", titleShadow ? styles.shadow_title : "")}>
        {title}
      </h1>
      <div className={`${className} hidden ${callback ? "flex flex-col lg:ml-auto" : styles.SearchBlock} lg:flex`}>
        {children}
      </div>
      <div className={`${className}  flex flex-col lg:hidden`}>{children}</div>
    </div>
  </div>
);

// <br />
{
  /*<pre>{JSON.stringify(props)}</pre>*/
}

export default Search;
