import React, { FC } from "react";
import style from "./clientReviewBlock.module.css";
// import icon from "src/assets/icons/arrow-left.svg";

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
              <i className="mdi mdi-arrow-right">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.99935 2.66663L7.05935 3.60663L10.7793 7.33329H2.66602V8.66663H10.7793L7.05935 12.3933L7.99935 13.3333L13.3327 7.99996L7.99935 2.66663Z"
                    fill="#567DD0"
                  />
                </svg>
              </i>
              {data.button.title}
            </a>
          </div>
          <img src={data.img} alt="" className={style.clientReviewBlock__img} />
        </div>
      </div>
    </div>
  );
};
