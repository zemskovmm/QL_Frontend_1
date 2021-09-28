

import { Continer } from "components/Continer";
import { Header } from "components/Header";
import { ComponentChildren, FunctionalComponent } from "preact";

type PropsType = {
    children: ComponentChildren;
};

export const AppLayout: FunctionalComponent<PropsType> = ({ children }) => {
    return (<div className="flex flex-col h-full">
        <Header title="Quartier-Latin dashboard" />
        <Continer className="flex-grow "> 
            { children }
        </Continer>
    </div>);
};

