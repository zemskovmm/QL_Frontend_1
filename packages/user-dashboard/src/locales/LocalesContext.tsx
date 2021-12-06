import React,{ FC,createContext, useState, useContext } from "react"
import { IntlProvider, useIntl } from "react-intl"
import { LocaleKeys,getLocaleMessages } from "./locales"


const LocalesContext = createContext<{setLang:(lang:string)=>void}>({setLang:()=>{}})

const getDefaultLang=()=>{
  const resultStorageLang = /en|ru|fr|esp|cn/.exec(localStorage.getItem('language')||"")
  if(resultStorageLang){
    return resultStorageLang[0]
  }
  const result = /en|ru|fr|esp|cn/.exec(navigator.language)
  if(result){
    return result[0]
  }
  return 'en'
}

export const LocalesContextProvider:FC= ({children})=>{
  const [lang, setLang] = useState<string>(getDefaultLang())
  
  const handleSetLang = (language:string)=>{
    localStorage.setItem('language',language)
    setLang(language)
  }

  return (
    <LocalesContext.Provider value={{setLang:handleSetLang}}>
      <IntlProvider locale={lang} defaultLocale={getDefaultLang()} messages={getLocaleMessages(lang)}>
        {children}
      </IntlProvider>
    </LocalesContext.Provider>
  )
}

export const useLocalized = () =>{
  const intl = useIntl()
  const {setLang} = useContext(LocalesContext)
  return {
    lang: intl.locale || "en",
    setLang,
    localizedText: (id:LocaleKeys,value?:any)=>intl.formatMessage({ id },value),
  }
}