import { Button } from "@project/components/src/ui-kit/Button";
import { TextareaControlled } from "@project/components/src/form/TextareaControlled";
import { FunctionalComponent } from "preact";
import { useForm } from "react-hook-form";
import { ChatMessagesType, ChatStoreType } from "./ChatStore";
import cn from "classnames"

type PropsType = {
  className?: string;
  applicationId: number;
  store: ChatStoreType;
};

export const MessagesEdit: FunctionalComponent<PropsType> = ({ className, applicationId, store: { sendMessage } }) => {
  const { handleSubmit, control, setValue } = useForm<ChatMessagesType>();

  const handleSendMessage = (data: ChatMessagesType) => {
    sendMessage(applicationId, data);
    setValue("text", "");
  };

  return (
    <form className={cn("flex",className)} onSubmit={handleSubmit(handleSendMessage) as any}>
      <TextareaControlled
        rows={5}
        className="flex-grow mr-2"
        name="text"
        placeholder="Ваше сообщение"
        control={control}
      />
      <Button className="self-end" text="Отправить" color="gray" type="submit" />
    </form>
  );
};
