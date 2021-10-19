import { ICON_SIZES } from "./_constants";

export type InputSizeType = keyof typeof ICON_SIZES;

export interface IconPropsType  {
    className?:string;
    src:string;
    alt?:string;
    size?: InputSizeType;
}