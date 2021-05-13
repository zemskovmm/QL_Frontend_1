import React, { FC } from "react";
import style from "./sponsorBlock.module.css";

type SponsorBlockProps = {
  title: string;
};

export const SponsorBlock: FC<SponsorBlockProps> = ({ title }) => {
  return (
    <div className={style.sponsorBlock__background}>
      <div className={style.sponsorBlock__maxWidth}>
        <div className={style.sponsorBlock__container}>
          <div className={style.sponsorBlock__head}>
            <h2 className={style.sponsorBlock__title} dangerouslySetInnerHTML={{ __html: title }} />
          </div>
          <div className={style.sponsorBlock__list}>
            <div className={style.sponsorBlock__sponsor}>
              <img src="`../../images/partners/ (${index}).png`" alt="" className={style.sponsorBlock__sponsorImg} />
            </div>
            <div className={style.sponsorBlock__sponsor}>
              <img src="`../../images/partners/ (${index}).jpg`" alt="" className={style.sponsorBlock__sponsorImg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
