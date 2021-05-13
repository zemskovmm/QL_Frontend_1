import React from "react";

import cn from 'classnames'

import styles from './langChooser.module.css'

export interface langProps {
  urls: string [],
  lang: string
}

export const  LangChooser = ({lang, urls}:langProps) => (
  <div className={cn(styles.lang, 'bg-bgprimary', 'rounded-primary')}>
    <span>RU</span>
    <span>{lang.toUpperCase()}</span>
    {urls.map(el => <span>{el}</span>)}
  </div>)


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
