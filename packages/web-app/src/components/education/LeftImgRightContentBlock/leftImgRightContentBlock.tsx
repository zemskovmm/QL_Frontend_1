import React, { FC } from "react";
import style from "./leftImgRightContentBlock.module.css";

type LeftImgRightContentBlockProps = {
  data: { img: string; text: string };
};

export const LeftImgRightContentBlock: FC<LeftImgRightContentBlockProps> = ({ data }) => {
  return (
    <div className={style.leftImgRightContentBlock__background}>
      <div className={style.leftImgRightContentBlock__maxWidth}>
        <div className={style.leftImgRightContentBlock__container}>
          <iframe
            className={style.leftImgRightContentBlock__img}
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/XSups4cXLpQ"
            title="YouTube video player"
          />
          {/*<img src="content.img" alt="" class="leftImgRightContentBlock__img" v-else>*/}
          <div className={style.leftImgRightContentBlock__content}>
            <div
              className={style.leftImgRightContentBlock__contentText}
              dangerouslySetInnerHTML={{ __html: data.text }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
