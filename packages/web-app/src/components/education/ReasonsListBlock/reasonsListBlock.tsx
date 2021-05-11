import React, { FC } from "react";
import style from "./reasonsListBlock.module.css";

type ReasonsListBlockProps = {
  data: { title: string; items: { img: string; title: string; subtitle: string }[] };
};

export const ReasonsListBlock: FC<ReasonsListBlockProps> = ({ data }) => {
  return (
    <div className={style.reasonsListBlock__background}>
      <div className={style.reasonsListBlock__maxWidth}>
        <div className={style.reasonsListBlock__container}>
          <h2 className={style.reasonsListBlock__title} dangerouslySetInnerHTML={{ __html: data.title }} />
          <div className={style.reasonsListBlock__list}>
            {data.items.map((el) => (
              <div className={style.reasonsListBlock__item} key="item.title + index">
                <img src="" alt="" className={style.reasonsListBlock__itemImg} />
                <div className={style.reasonsListBlock__itemTitle}>
                  {el.title.toUpperCase()[0] + el.title.toLowerCase().slice(1)}
                </div>
                <div
                  className={style.reasonsListBlock__itemSubtitle}
                  dangerouslySetInnerHTML={{ __html: el.subtitle }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
