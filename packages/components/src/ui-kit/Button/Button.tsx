import React, { FunctionComponent} from "react";
import { BUTTON_COLORS, BUTTON_SIZES } from "./_constats";
import { ButtonPropsType } from "./_types";


    


export const Button:FunctionComponent<ButtonPropsType> = 
    ({className, id, text, type, color='default', size='default', disabled=false, isFullWidth=false,onClick})=>{

    const classes = [
        'rounded text-medium whitespace-nowrap',
        isFullWidth ? 'w-full' : '',
        BUTTON_COLORS[color],
        BUTTON_SIZES[size],
        className ? className : "",
    ].join(' ');

    const handleOnClick = ()=>{
        onClick && onClick(id)
    }

    return (
        <button className={classes} id={id} type={type} disabled={disabled} onClick={handleOnClick}>
            {text}
        </button>
    )
}