import React, { FunctionComponent } from "react";
import { TEXT_TAGS } from "./TextTags";
import { TEXT_COLORS, TEXT_SIZES, TEXT_WEIGHT } from "./_constants";
import cn from "classnames";

export type TextColorType = keyof typeof TEXT_COLORS;
export type TextSizeType = keyof typeof TEXT_SIZES;
export type TextWeightType = keyof typeof TEXT_WEIGHT;
export type TextTagType = keyof typeof TEXT_TAGS;

export type TextPropsType = {
  className?: string;
  /** Отображаемый текст */
  text: string;
  /** Толщина шрифта*/
  weight?: TextWeightType;
  /** Флаг включающий выравнивание по центру */
  isCenter?: boolean;
  /** Цвет текста */
  color?: TextColorType;
  /** Размер текста */
  size?: TextSizeType;
  /** Тег который добавится в html */
  tag?: TextTagType;
};

export const Text: FunctionComponent<TextPropsType> = ({
  className,
  text,
  weight = "normal",
  isCenter,
  color = "primary",
  size = "large",
  tag = "span",
}) => {
  const Tag = TEXT_TAGS[tag];

  return (
    <Tag
      className={cn(
        TEXT_COLORS[color],
        TEXT_SIZES[size],
        TEXT_WEIGHT[weight],
        isCenter ? "text-center" : null,
        className
      )}
      value={text}
    />
  );
};
