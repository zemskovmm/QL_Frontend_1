import React, { FC, useState } from "react";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import pin from "./pin.svg";
import style from "./MultiImgBlock.module.css";
import { LocalizedText } from "src/components/common/LocalizedText";

interface MultiImgBlockProps {
  img: number[];
  text: string;
}

export const MultiImgBlock: FC<MultiImgBlockProps> = ({ img, text }) => {
  const [current, setCurrent] = useState(img[0]);
  return (
    <div className={`lg:px-0 px-4 flex w-full mx-auto max-w-screen-xl w-full`}>
      <div className={`flex w-full mr-20`}>
        <div className={`${style.multiImg__list} flex flex-col`}>
          {img.map((el, index) => (
            <img
              src={`${ApiBaseUrl}/api/media/scaled/${el}?dimension=200`}
              alt=""
              key={`${index} multi img`}
              onClick={() => setCurrent(el)}
              className={`${style.multiImg__list_item} cursor-pointer`}
            />
          ))}
        </div>
        <img src={`${ApiBaseUrl}/api/media/scaled/${current}`} alt="" className={style.multiImg__list_setItem} />
      </div>
      <div className={`${style.multiImg__content} flex flex-col justify-between`}>
        <div>
          <div className={style.multiImg__contentTitle}>
            Студенческая резиденция
            <br />
            Le Coquibus Эври
          </div>
          <a className={`flex ${style.multiImg__contentMap}`}>
            <img src={pin} alt="" /> <span className={`ml-2`}>20-22, allée Boissy d´Anglas - 91000 Эври, Франция</span>
          </a>
        </div>
        <div
          className={style.multiImg__contentText}
          dangerouslySetInnerHTML={{
            __html:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
          }}
        />
        <div className={`flex flex-col`}>
          <span className={style.multiImg__contentPriceTitle}>
            <LocalizedText id={"catalogItems_price"} />
          </span>
          <span className={style.multiImg__contentPrice}>
            <b>
              <LocalizedText id={"catalogItems_price_upto"} /> 40 <LocalizedText id={"catalogItems_price_value"} />
            </b>{" "}
            / <LocalizedText id={"catalogItems_price_month"} />
          </span>
        </div>
      </div>
    </div>
  );
};
