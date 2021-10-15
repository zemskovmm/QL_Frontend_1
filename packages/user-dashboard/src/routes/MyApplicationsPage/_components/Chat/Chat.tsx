import { FunctionalComponent } from "preact";
import { useEffect } from "preact/hooks";
import { ChatStoreType } from "./ChatStore";
import { Messages } from "./Messages";
import { MessagesEdit } from "./MessagesEdit";

type PropsType = {
    className?:string;
    applicationId: number;
    store: ChatStoreType;
};

export const Chat: FunctionalComponent<PropsType> = ({className, applicationId, store}) => {

    useEffect(()=>{
        store.getMessages(applicationId);
    },[applicationId])

    const classes = [
        "flex flex-col border gap-2 p-2",
        className ? className : "",
    ].join(' ');

    return <div className={classes} >
        <Messages className="flex-grow" store={store}/>
        <MessagesEdit applicationId={applicationId} store={store}/>
    </div>
};