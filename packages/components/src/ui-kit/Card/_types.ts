import { CARD_SIZES } from "./_constants";
import { CSSProperties } from "react";

export type CardSizeType = keyof typeof CARD_SIZES;

export interface CardPropsType {
  className?: string;
  size?: CardSizeType;
  style?: CSSProperties;
}
