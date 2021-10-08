import { Button } from "@project/components/src/ui-kit/Button";
import { InputControlled } from "components/InputControlled";
import { FunctionalComponent } from "preact";
import { useForm } from "react-hook-form";
import { ChatMessagesType, ChatStoreType } from "./ChatStore";

type PropsType = {
    className?:string;
    applicationId:number;
    store: ChatStoreType;
};

export const MessagesEdit: FunctionalComponent<PropsType> = ({className, applicationId, store:{sendMessage}}) => {
    const { handleSubmit, control, setValue } = useForm<ChatMessagesType>();

    const classes = [
        "flex flex-col gap-2",
        className ? className : "",
    ].join(' ');

    const handleSendMessage = (data:ChatMessagesType) =>{
        sendMessage(applicationId, data)
        setValue("text","");
    }

    return (
        <form className="flex" onSubmit={handleSubmit(handleSendMessage) as any}>
            <InputControlled 
                rows={5}
                tag="textarea"
                className="flex-grow"
                name="text" 
                placeholder="Ваше сообщение" 
                control={control} />
            <Button className="flex-grow-0"  text="Отправить" color="secondary" type="submit"/>
        </form>
    )
};