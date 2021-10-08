import { Text } from "@project/components/src/ui-kit/Text";
import { FunctionalComponent } from "preact";

type PropsType = {
    className?:string;
    me: boolean;
    title: string;
    text: string;
};

export const Message: FunctionalComponent<PropsType> = ({className,title,text,me}) => {

    const classes = [
        "flex flex-col rounded border px-2",
        me ? 
            "bg-green-100 self-end" :
            "bg-white self-start",
        className ? className : "",
    ].join(' ');

    return <div className={classes}>
        <Text text={title} size="caption" color="help"/>
        <Text text={text} />
    </div>
};