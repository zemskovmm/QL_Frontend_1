import React, { FC } from "react";
import style from "./postScript.module.css";

type PostScriptProps = {
  data: {
    name: string;
    description: string;
  };
};

export const PostScript: FC<PostScriptProps> = ({ data }) => {
  return (
    <div className={style.postScriptButton}>
      {data.description && (
        <div className={style.postScriptButton__description} dangerouslySetInnerHTML={{ __html: data.description }} />
      )}
      <button className={style.postScriptButton__button}>{data.name}</button>
    </div>
  );
};
