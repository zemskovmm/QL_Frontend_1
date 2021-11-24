import React, { FunctionComponent } from "react";

type TextTagPropsType = {
    className: string;
    value: string;
}

export const TEXT_TAGS:{ [key:string]:FunctionComponent<TextTagPropsType> } = {
    "h1": ({className, value}) => <h1 className={className}>{value}</h1>,
    "h2": ({className, value}) => <h2 className={className}>{value}</h2>,
    "h3": ({className, value}) => <h3 className={className}>{value}</h3>,
    "h4": ({className, value}) => <h4 className={className}>{value}</h4>,
    "h5": ({className, value}) => <h5 className={className}>{value}</h5>,
    "h6": ({className, value}) => <h6 className={className}>{value}</h6>,
    "span": ({className, value}) => <span className={className}>{value}</span>,
    "a": ({className, value}) => <a className={className}>{value}</a>,
    "pre": ({className, value}) => <pre className={className}>{value}</pre>,
}