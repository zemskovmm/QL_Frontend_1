import { TEXT_TAGS } from "./TextTags";
import { TEXT_COLORS, TEXT_SIZES } from "./_constants";

export type TextColorType = keyof typeof TEXT_COLORS;
export type TextSizeType = keyof typeof TEXT_SIZES;
export type TextTagType = keyof typeof TEXT_TAGS;

export type TextPropsType = {
    className?:string;
    /** Отображаемый текст */
    text: string;
    /** Флаг включающий жирное отображение */
    isBold?: boolean;
    /** Цвет текста */
    color?: TextColorType;
    /** Размер текста */
    size?: TextSizeType;
    /** Тег который добавится в html */
    tag?: TextTagType;
};