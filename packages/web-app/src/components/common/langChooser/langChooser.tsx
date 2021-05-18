import React, {useState} from "react";
import cn from 'classnames'
import {default  as Flags} from "src/assets/icons/flags";
import styles from './langChooser.module.css'

import Link from "next/link";
interface langProps {
  urls: {
    [key: string] : string
  },
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
    {Object.keys(urls).length > 0 && <>
      <div className={isOpen ? styles.back : ''} />
      <ul className={isOpen ? styles.open : ''}>
        {Object.keys(urls).map(el => <li className={el === lang ? 'font-bold' : ''}><Link href={urls[el]}>{el}</Link></li>)}
      </ul>
    </>

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
