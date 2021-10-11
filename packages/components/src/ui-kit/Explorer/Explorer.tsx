import React, { FunctionComponent } from "react";
import { ExplorerPropsType } from "./_types";


export const Explorer: FunctionComponent<ExplorerPropsType> = ({ className=""}) => {
    const classes = [
        "p-4 rounded-md border-1 border-help shadow",
        className ? className : "",
    ].join(' ');

    return (
        <div className={classes}>
            
        </div>
    );
};