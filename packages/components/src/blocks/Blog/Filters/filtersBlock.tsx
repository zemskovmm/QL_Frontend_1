import React, { useState } from "react";
import styles from "./filtersBlock.module.css";

export const FiltersBlock = (props: { tags?: any[]; tags2?: string[]; click: (id: number) => void }) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className={`py-12 mx-4`}>
      <button onClick={() => setOpenMenu(true)} className={`${styles.filter__button} flex w-full md:hidden`}>
        # Поиск по тегам
      </button>
      <div className={`${openMenu ? "flex" : "hidden"} ${styles.filter__modal} flex-col md:flex fixed md:relative`}>
        <div className={`flex items-center mb-4 md:hidden`}>
          Filters
          <button onClick={() => setOpenMenu(false)} className={`flex bold ml-auto`}>
            X
          </button>
        </div>
        <div className={`flex flex-col overflow-y-scroll md:overflow-y-visible md:flex-row	md:justify-between`}>
          <form className={`flex flex-wrap ${styles.filter__red} md:w-6/12`}>
            {props.tags &&
              props.tags.map((tag) => {
                return tag ? (
                  <label className={`mb-4 mr-3`} key={tag.id}>
                    <input type={"checkbox"} name={"hi"} onChange={(e) => props.click(tag.id)} />
                    <span>{tag.names["en"]}</span>
                  </label>
                ) : (
                  ""
                );
              })}
          </form>
          <div className={`flex flex-wrap ${styles.filter__blue} md:w-6/12 md:justify-end`}>
            {props.tags2 &&
              props.tags2.map((tag) => (
                <label className={`mb-4 mr-3`} key={tag + "2"}>
                  <input type={"checkbox"} name={"hi"} />
                  <span>{tag}</span>
                </label>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};