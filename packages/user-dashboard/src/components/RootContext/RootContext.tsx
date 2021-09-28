import { createContext, FunctionalComponent } from "preact";
import { useContext, useEffect } from "preact/hooks";
import { NotificationStore } from "stores/NotificationStore";
import { RootStore } from "./_store";


const notificationState = new NotificationStore()
const rootState = new RootStore(notificationState);


const RootContext = createContext<RootStore>(rootState);

export const RootContextProvider:FunctionalComponent = ({ children }) => {
    const {heartbeatAction} = rootState

    useEffect(()=>{
        heartbeatAction();
    },[])

    return <RootContext.Provider value={rootState}>{ children }</RootContext.Provider>
}

export const useRootContext = (): RootStore => useContext(RootContext);