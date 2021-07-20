import React, { useState } from "react";
import styles from "./filtersBlock.module.css";

export const rangeMap = (count: number) =>
  Array(count)
    .fill(null)
    .map((_, i) => i);

export interface FiltersBlockElement {
  title: string;
  link: string;
}

export const FiltersBlock = (props: { items: FiltersBlockElement[] }) => {
  const items = rangeMap(12);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className={`py-12 mx-4`}>
      <button onClick={() => setOpenMenu(true)} className={`${styles.filter__button} flex w-full md:hidden`}>
        # Поиск по тегам
      </button>
      <div className={`${openMenu ? "flex" : "hidden"} ${styles.filter__modal} flex-col md:flex fixed md:relative`}>
        <div className={`flex items-center mb-4 md:hidden`}>
          Fillters
          <button onClick={() => setOpenMenu(false)} className={`flex bold ml-auto`}>
            X
          </button>
        </div>
        <div className={`flex flex-col overflow-y-scroll md:overflow-y-visible md:flex-row	md:justify-between`}>
          <div className={`flex flex-wrap ${styles.filter__red} md:w-6/12`}>
            {items.map((el) => (
              <label className={`mb-4 mr-3`}>
                <input type={"checkbox"} name={"hi"} />
                <span>Изучение языка</span>
              </label>
            ))}
          </div>
          <div className={`flex flex-wrap ${styles.filter__blue} md:w-6/12 md:justify-end`}>
            {items.map((el) => (
              <label className={`mb-4 mr-3`}>
                <input type={"checkbox"} name={"hi"} />
                <span>Изучение языка</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
