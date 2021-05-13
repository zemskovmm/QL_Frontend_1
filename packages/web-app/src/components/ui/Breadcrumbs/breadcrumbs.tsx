import React, { FC } from "react";
import style from "./breadcrumbs.module.css";

type BreadcrumbsProps = {
  items: {
    name: string;
    link: string;
  }[];
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className={style.breadcrumbs}>
      {items.map((el, index) => (
        <a href={el.link} className={style.breadcrumbs__items} key={`${index} bread`}>
          {el.name}
        </a>
      ))}
    </div>
  );
};
