import React,{ FunctionComponent,useState,MouseEvent } from "react";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { Text } from "@project/components/src/ui-kit/Text";
import { Button } from "@project/components/src/ui-kit/Button";
import { Dropmenu } from "@project/components/src/ui-kit/Dropmenu";
import EN_FLAG from "@project/components/src/assets/img/flags/en.svg"
import RU_FLAG from "@project/components/src/assets/img/flags/ru.svg"
import FR_FLAG from "@project/components/src/assets/img/flags/fr.svg"
import ESP_FLAG from "@project/components/src/assets/img/flags/esp.svg"
import CN_FLAG from "@project/components/src/assets/img/flags/cn.svg"


const LANGS:{[key:string]:{char:string,flag:string}} = {
    en: {char:"$", flag:EN_FLAG },
    fr: {char:"€", flag: FR_FLAG},
    ru: {char:"₽", flag:RU_FLAG },
    cn: {char:"¥", flag:CN_FLAG },
    esp: {char:"P", flag:ESP_FLAG },
};


type PropsType = {
    lang: string;
    onChoose: (lang:string)=>void
}

export const LangChooser:FunctionComponent<PropsType> = ({ lang, onChoose }) => {

    const currLang = (lang in LANGS) ? lang : "en"
    const handleChoose = (event:MouseEvent<HTMLElement>)=>{
        onChoose(event.currentTarget.id);
    }
  
    return (
        
        <Dropmenu content={
            <Button className="relative" color="secondary">
                <Icon src={LANGS[currLang].flag} alt={lang} size="6"/>
                <div className="mx-2 w-px h-1/2 bg-gray-400"/>
                <Text className="px-2" text={LANGS[currLang].char} size="caption"/>
                
            </Button>
        }>
            {Object.keys(LANGS).map((id) => (
                <div className="px-4 py-1 hover:bg-blue-100" id={id} key={`LangChooser-${id}`} onClick={handleChoose}>
                    <Text text={id} size="large" />
                </div>
            ))}
        </Dropmenu>
    );
};