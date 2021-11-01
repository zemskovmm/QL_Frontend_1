import React, { FunctionComponent, useEffect, ReactNode, useRef, useState } from "react";
import { DROPMENU_POSITIONS } from "./_constants";

type DropmenuPosition = keyof typeof DROPMENU_POSITIONS;

type DropmenuPropsType = {
    className?:string;
    content:ReactNode,
    position?: DropmenuPosition;
}

export const Dropmenu: FunctionComponent<DropmenuPropsType> = ({ className="", content , children, position = "down" }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen= ()=>{
        setIsOpen(it=>!it);
    }

    const classes = [
        DROPMENU_POSITIONS[position],
        "z-10 border drop-shadow bg-white rounded",
    ].join(' ');

    useEffect(() => {
        const handleOutsideControl = (event: any) => {
            const isClickedOutside = !dropdownRef?.current?.contains(event.target);
            if(isClickedOutside){
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleOutsideControl);

        return () => {
            document.removeEventListener('click', handleOutsideControl);
        };
    }, [dropdownRef]);


    return (
        <div ref={dropdownRef} className={`relative inline ${className}`} onClick={handleOpen}>
            {content}
            {isOpen && <div className={classes} >
                {children}
            </div>}
        </div>
        
    );
};