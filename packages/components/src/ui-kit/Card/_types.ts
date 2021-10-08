import { CARD_SIZES } from "./_constants";

export type CardSizeType = keyof typeof CARD_SIZES;

export interface CardPropsType  {
    className?:string;
    size?: CardSizeType;
}