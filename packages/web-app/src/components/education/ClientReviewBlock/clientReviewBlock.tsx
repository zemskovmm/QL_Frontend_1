import React, { FC } from "react";
import style from "./clientReviewBlock.module.css";
import icon from "src/assets/icons/arrow-left.svg";

type ClientReviewBlockProps = {
  data: { img: string; text: string; button: { title: string; url: string } };
};

export const ClientReviewBlock: FC<ClientReviewBlockProps> = ({ data }) => {
  return (
    <div className={style.clientReviewBlock__background}>
      <div className={style.clientReviewBlock__maxWidth}>
        <div className={style.clientReviewBlock__container}>
          <div className={style.clientReviewBlock__content}>
            <div className={style.clientReviewBlock__contentText} dangerouslySetInnerHTML={{ __html: data.text }} />
            <a href={data.button.url} target="_blank" className={style.clientReviewBlock__buttonMore}>
              <img src={icon} className="mdi mdi-arrow-right mr-2" />
              <span className={"pl-2"}>{data.button.title}</span>
            </a>
          </div>
          <img src={data.img} alt="" className={style.clientReviewBlock__img} />
        </div>
      </div>
    </div>
  );
};
