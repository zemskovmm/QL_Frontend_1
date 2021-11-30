import { FC } from "react";
import { ChatStore } from "./ChatStore";
import { Message } from "./Message";

import style from "./messageStyle.module.css";

type PropsType = {
  className?: string;
  store: ChatStore;
};

// TODO ЭТО НЕ РАБОТАЕТ ИЗНАЧАЛЬНО!
export const Messages: FC<PropsType> = ({ className, store: { messages } }) => {
  const classes = ["flex flex-col gap-2 pl-2.5 pr-5 py-2 customScroll ", className ? className : ""].join(" ");

  return (
    <div className={`${classes} ${style.message__chat}`}>
      {/*{messages.map(({ author, text, date }) => {*/}
      {/*  return <Message key={date.toString()} title={date.toLocaleString()} text={text} me={author === "User"} />;*/}
      {/*})}*/}
    </div>
  );
};
