import { PRELOAD_COLORS } from "./_constants";

export type PreloadColorType = keyof typeof PRELOAD_COLORS;

export type PreloadPropsType = {
    className?:string;
    isLoading?:boolean;
    color?:PreloadColorType;
    curtainClass?:string;
}