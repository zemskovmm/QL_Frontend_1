import React, { FunctionComponent } from "react";
import {Icon,InputSizeType} from "@project/components/src/ui-kit/Icon"
import EN_FLAG from "@project/components/src/assets/img/flags/en.svg"
import RU_FLAG from "@project/components/src/assets/img/flags/ru.svg"
import FR_FLAG from "@project/components/src/assets/img/flags/fr.svg"
import ESP_FLAG from "@project/components/src/assets/img/flags/esp.svg"
import CN_FLAG from "@project/components/src/assets/img/flags/cn.svg"


const FLAGS:{[key:string]:string} = {
    en: EN_FLAG ,
    fr: FR_FLAG,
    ru: RU_FLAG ,
    cn: CN_FLAG ,
    esp: ESP_FLAG ,
};

export type FlagIconPropsType = {
    className?:string;
    lang: string;
    size?: InputSizeType;
}


export const FlagIcon:FunctionComponent<FlagIconPropsType> = ({className,lang, size="6"})=>{
    const currLang = (lang in FLAGS) ? lang : "en"
    
    return <Icon src={FLAGS[currLang]} alt={currLang} size={size}/>
}