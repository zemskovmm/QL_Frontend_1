import React from "react";

import styles from "./Search.module.css";
import { ApiBaseUrl } from "../../api/apiClientBase";
import cn from "classnames";

interface SearchProps {
  logo?: number | null;
  title?: string;
  titleColor?: "black" | "white";
  titleShadow?: boolean;
  children: React.ReactNode;
  className?: string;
  background?: number | null;
  callback?: boolean;
  backgroundShadow?: string;
  breadcrumbs?: {
    url: string;
    title: string;
  }[];
}

const Search = ({
  logo,
  title,
  children,
  className,
  background,
  breadcrumbs,
  callback,
  backgroundShadow = "0%",
  titleColor = "black",
  titleShadow = false,
}: SearchProps) => (
  <div
    className={styles.Search + ` ${breadcrumbs ? styles.SearchPadding__breadcrumbs : styles.SearchPadding}`}
    style={{
      backgroundImage: background ? `url(${ApiBaseUrl}/api/media/${background})` : undefined,
      backgroundColor: `rgba(0,0,0,${backgroundShadow})`,
    }}
  >
    <div
      className={`flex flex-col justify-center lg:items-start max-w-screen-xl w-full my-0 mx-auto px-4 lg:px-10 ${
        callback ? "lg:flex-row lg:items-center" : ""
      }`}
    >
      <h1 className={cn(titleColor === "white" ? styles.white_title : "", titleShadow ? styles.shadow_title : "")}>
        {logo && <img src={`${ApiBaseUrl}/api/media/${logo}`} alt="" />}
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
