import React, { FC } from "react";
import style from "./sponsorBlock.module.css";
import { rangeMap } from "src/utilities/utils";

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
            {rangeMap(8).map((el) => (
              <div className={style.sponsorBlock__sponsor}>
                <img src={`/images/partners/ (${el + 1}).png`} alt="" className={style.sponsorBlock__sponsorImg} />
              </div>
            ))}
            {rangeMap(2).map((el) => (
              <div className={style.sponsorBlock__sponsor}>
                <img src={`/images/partners/ (${el + 1}).jpg`} alt="" className={style.sponsorBlock__sponsorImg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
