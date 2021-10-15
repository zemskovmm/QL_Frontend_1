import { FunctionalComponent } from "preact";
import { ChatStoreType } from "./ChatStore";
import { Message } from "./Message";

type PropsType = {
    className?:string;
    store: ChatStoreType;
};

export const Messages: FunctionalComponent<PropsType> = ({className, store:{messages}}) => {

    const classes = [
        "flex flex-col gap-2",
        className ? className : "",
    ].join(' ');

    return <div className={classes} >
        {messages.map(({author,text,date})=>{
            return <Message key={date.toString()} title={date.toLocaleString()} text={text} me={author === "User"}/>
        })}
    </div>
};