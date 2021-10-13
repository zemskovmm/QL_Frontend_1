import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useEffect } from "preact/hooks";
import { useLocalesStore } from "stores/LocalesStore";
import { useGlobalSettingsStore } from "stores/GlobalSettingsStore";
import { Continer } from "components/Continer";

type PropsType = {
    className?: string;
}

export const Footer: FunctionalComponent<PropsType> = memo(({className}) => {
    const { gs,getGlobalSettings } = useGlobalSettingsStore();
    const { lang } = useLocalesStore();

    useEffect(()=>{
        getGlobalSettings(lang);
    },[lang,getGlobalSettings]);

    return (
        <Continer className={`bg-blue-400 py-4 ${className}`}> 
            {JSON.stringify(gs,null,"  ")}
        </Continer>
    );
});