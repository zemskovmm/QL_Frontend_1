import React, { FunctionComponent } from "react";
import { CARD_SIZES } from "./_constants";
import { CardPropsType } from "./_types";





export const Card: FunctionComponent<CardPropsType> = ({ className="", size="large" , children }) => {
    const classes = [
        "p-4 rounded-md border-1 border-help shadow",
        CARD_SIZES[size],
        className ? className : "",
    ].join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
};