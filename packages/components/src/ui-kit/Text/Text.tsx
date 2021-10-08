import React, { FunctionComponent } from "react";
import { TEXT_TAGS } from "./TextTags";
import { TEXT_COLORS, TEXT_SIZES } from "./_constants";
import { TextPropsType } from "./_types";

export const Text:FunctionComponent<TextPropsType> = 
    ({className, text, isBold, color='primary', size='large', tag='span'})=>{

    const Tag = TEXT_TAGS[tag];
    const classes = [
        TEXT_COLORS[color],
        TEXT_SIZES[size],
        isBold ? "font-bold" :"",
        className ? className : "",
    ].join(' ');

    return <Tag className={classes} value={text}/>
}