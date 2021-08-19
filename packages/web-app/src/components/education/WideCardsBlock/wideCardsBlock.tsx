import React, { FC } from "react";
import style from "./wideCardsBlock.module.css";
import { PostScript } from "src/components/common/contactUsForm/contactUsForm";

type WideCardsBlockProps = {
  data: {
    title: string;
    subtitle: string;
    items: { img: string; name: string }[];
    button: { link: string; name: string; description: string };
  };
};

export const WideCardsBlock: FC<WideCardsBlockProps> = ({ data }) => {
  return (
    <div className={style.wideCardsBlock__background}>
      <div className={style.wideCardsBlock__maxWidth}>
        <div className={style.wideCardsBlock__container}>
          <div className={style.wideCardsBlock__head}>
            <h2 className={style.wideCardsBlock__title} dangerouslySetInnerHTML={{ __html: data.title }} />
            <span className={style.wideCardsBlock__subtitle} dangerouslySetInnerHTML={{ __html: data.subtitle }} />
          </div>
          <div className={style.wideCardsBlock__list}>
            {data.items.map((el, ind) => (
              <div key={ind} className={style.wideCardsBlock__card}>
                <img src={el.img} alt="" className={style.wideCardsBlock__cardImg} />
                <div dangerouslySetInnerHTML={{ __html: el.name }} className={style.wideCardsBlock__cardName} />
              </div>
            ))}
          </div>
          <PostScript data={data.button} />
        </div>
      </div>
    </div>
  );
};
