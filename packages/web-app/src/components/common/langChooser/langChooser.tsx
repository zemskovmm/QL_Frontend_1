import React, {useState} from "react";
import cn from 'classnames'
import {default  as Flags} from "src/assets/icons/flags";
import styles from './langChooser.module.css'
import {HeaderDataDto} from "../../../interfaces/headerDataDto";

interface langProps {
  urls: string [],
  lang: string
}

type currType = {
  [key: string]: string
}

export const  LangChooser = ({lang, urls}:langProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const curr: currType = {
    ru: 'RUB',
    cn: '¥',
    esp: '$',
    en: '$',
    fr: '€'
  }

  return <div onClick={()=>setIsOpen(!isOpen)} className={cn(styles.lang, 'bg-bgprimary', 'rounded-primary')}>
    <Flags icon={lang} />
    <span>{curr[lang]}</span>
    {urls.length > 0 && <ul className={isOpen ? styles.open : ''}>
      {urls.map(el => <li className={el === lang ? 'font-bold' : ''}><a href={el === lang ? '#' : `/${el}`}>{el}</a></li>)}
    </ul>
    }
  </div>
}


/*<select
            className="text-black"
            value={lang}
            onChange={(e) => {
              const newLang = e.target.value;
              if (props.urls.hasOwnProperty(newLang)) {
                router.push(props.urls[newLang]);
              }
            }}
          >
            {supportedLocales.map((l) => (
              <option value={l}>{AllLanguages[l].title}</option>
            ))}
          </select>*/
