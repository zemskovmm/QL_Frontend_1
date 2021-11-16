import React, { FC } from "react";
import style from "./bigCardsListBlock.module.css";
import { PostScript } from "src/components/common/ContactUsForm";

type BigCardProps = {
  card: {
    title: string;
    img: string;
    url: string;
  };
};

const BigCard: FC<BigCardProps> = ({ card }) => {
  return (
    <>
      {card.url ? (
        <a href={card.url} className={style.bigCard}>
          <img src={card.img} alt="" className={style.bigCard__img} />
          <div className={style.bigCard__title} dangerouslySetInnerHTML={{ __html: card.title }} />
          {/*<div className={style.bigCard__subtitle} dangerouslySetInnerHTML={{ __html: card.subtitle }} />*/}
        </a>
      ) : (
        <div className={style.bigCard}>
          <img src={card.img} alt="" className={style.bigCard__img} />
          <div className={style.bigCard__title} dangerouslySetInnerHTML={{ __html: card.title }} />
          {/*<div className="bigCard__subtitle" dangerouslySetInnerHTML={{ __html: card.subtitle }} />*/}
        </div>
      )}
    </>
  );
};

type BigCardsListBlockProps = {
  cards: { img: string; title: string; url: string }[];
  title: string;
  linksButton: { link: string; name: string; description: string };
};

export const BigCardsListBlock: FC<BigCardsListBlockProps> = ({ cards, linksButton, title }) => {
  return (
    <div className={style.bigCardsListBlock__background}>
      <div className={style.bigCardsListBlock__maxWidth}>
        <div className={style.bigCardsListBlock__container}>
          <h2 className={style.bigCardsListBlock__title} dangerouslySetInnerHTML={{ __html: title }} />
          <div className={style.bigCardsListBlock__list}>
            {cards.map((el, ind) => (
              <BigCard key={ind} card={el} />
            ))}
          </div>
          <PostScript data={linksButton} />
        </div>
      </div>
    </div>
  );
};
