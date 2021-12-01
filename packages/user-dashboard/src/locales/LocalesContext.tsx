import React,{ FC,createContext, useState, useContext, useEffect } from "react"
import { IntlProvider, useIntl } from "react-intl"
import { LocaleKeys,getLocaleMessages } from "./locales"


const LocalesContext = createContext<{setLang:(lang:string)=>void}>({setLang:()=>{}})




export const LocalesContextProvider:FC= ({children})=>{
  const defaultLang = navigator.language || 'en'
  const [lang, setLang] = useState<string>(defaultLang)

  return (
    <LocalesContext.Provider value={{setLang}}>
      <IntlProvider locale={lang} defaultLocale={defaultLang} messages={getLocaleMessages(lang)}>
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