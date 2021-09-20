import React, { FC, useContext, useState } from "react";
import { ApiBaseUrl } from "@project/components/src/api/apiClientBase";
import pin from "./pin.svg";
import style from "./MultiImgBlock.module.css";
import { LocalizedText } from "src/components/common/LocalizedText";

interface MultiImgBlockProps {
  img: number[];
  text: string;
  title: string;
  city: string;
}

export const MultiImgBlock: FC<MultiImgBlockProps> = ({ img, text, title, city }) => {
  const [current, setCurrent] = useState(img[0]);

  return (
    <div className={`px-0 md:px-4 flex flex-col lg:flex-row w-full mx-auto max-w-screen-xl w-full`}>
      <div className={`flex w-full mb-5 lg:mb-0 lg:mr-20`}>
        <div className={`${style.multiImg__list} flex md:flex-col`}>
          {img.map((el, index) => (
            <img
              src={`${ApiBaseUrl}/api/media/scaled/${el}?dimension=290`}
              alt=""
              key={`${index} multi img`}
              onClick={() => setCurrent(el)}
              className={`${style.multiImg__list_item} cursor-pointer`}
            />
          ))}
        </div>
        <img
          src={`${ApiBaseUrl}/api/media/scaled/${current}`}
          alt=""
          className={`${style.multiImg__list_setItem} hidden md:block`}
        />
      </div>
      <div className={`${style.multiImg__content} px-4 lg:px-0 flex flex-col justify-between w-full`}>
        <div>
          <div className={`${style.multiImg__contentTitle} mb-2 lg:mb-7`}>
            {title} {city}
          </div>
          <a className={`flex items-start ${style.multiImg__contentMap}`}>
            <img src={pin} alt="" /> <span className={`ml-2`}>20-22, allée Boissy d´Anglas - 91000 Эври, Франция</span>
          </a>
        </div>
        <div
          className={style.multiImg__contentText}
          dangerouslySetInnerHTML={{
            __html: "",
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
