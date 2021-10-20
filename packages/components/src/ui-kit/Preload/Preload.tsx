import React, { FunctionComponent } from "react";
import { Icon } from "@project/components/src/ui-kit/Icon";
import PRELOAD_ICON from "@project/components/src/assets/animation/preload.gif";
import { PreloadPropsType } from "./_types";
import { PRELOAD_COLORS } from "./_constants";



export const Preload: FunctionComponent<PreloadPropsType> = ({ className="",isLoading=false, color="white-50",curtainClass="", children }) => {
    const classes = [
        "relative",
        className,
    ].join(' ');
    const classesCurtain = [
        "absolute bottom-0 left-0 w-full h-full",
        "flex items-center justify-center",
        PRELOAD_COLORS[color],
        curtainClass,
    ].join(' ');

    return (
        <div className={classes}>
            { children }
            { isLoading && <div className={classesCurtain}>
                <Icon src={PRELOAD_ICON} size="16" alt="Loading..." />
            </div> }
        </div>
    );
};