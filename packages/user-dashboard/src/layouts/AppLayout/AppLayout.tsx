

import { Header } from "components/Header";
import { ComponentChildren, FunctionalComponent } from "preact";

type PropsType = {
    children: ComponentChildren;
};

export const AppLayout: FunctionalComponent<PropsType> = ({ children }) => {
    return (<div className="flex flex-col h-full p-4">
        <Header title="Quartier-Latin dashboard" />
        <div className="flex-grow "> 
            { children }
        </div>
    </div>);
};

