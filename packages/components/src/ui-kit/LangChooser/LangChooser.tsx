import React,{ FunctionComponent,useState,ReactNode } from "react";
import { FlagIcon } from "@project/components/src/ui-kit/FlagIcon";


import cn from "classnames";
import styles from "./langChooser.module.css";


const LANGS:{[key:string]:string} = {
    en: "$",
    fr: "€",
    ru: "₽", 
    cn: "¥", 
    esp: "P",
};


type LinkPropsType = {
    url:string;
    lang:string;
}

export type LangChooserPropsType = {
    lang: string;
    urls: { [key: string]: string;};
    linkComponent: (props:LinkPropsType)=>ReactNode;
}

export const LangChooser:FunctionComponent<LangChooserPropsType> = ({ 
    lang,
    urls, 
    linkComponent,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const currLang = (lang in LANGS) ? lang : "en"
    return (
        <div onClick={() => setIsOpen(!isOpen)} className={cn(styles.lang, "bg-button-secondary", "rounded-primary")}>
            <FlagIcon lang={currLang} />
            <span>{LANGS[currLang]}</span>
            {Object.keys(urls).length > 0 && (
            <>
                <div className={isOpen ? styles.back : ""} />
                <ul className={isOpen ? styles.open : ""}>
                {Object.keys(urls).map((el, index) => (
                    <li key={el + index + "LangChooser"} className={el === lang ? "font-bold" : ""}>
                        {linkComponent({lang:el,url:urls[el]})}
                    </li>
                ))}
                </ul>
            </>
            )}
        </div>
    );
};