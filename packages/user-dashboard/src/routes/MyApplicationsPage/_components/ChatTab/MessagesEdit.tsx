import { Button } from "@project/components/src/ui-kit/Button";
import { TextareaControlled } from "@project/components/src/form/TextareaControlled";
import { FunctionalComponent } from "preact";
import { useForm } from "react-hook-form";
import { ChatMessagesType, ChatStoreType } from "./ChatStore";
import cn from "classnames";

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
    <form className={cn(`flex`, className)} onSubmit={handleSubmit(handleSendMessage) as any}>
      <TextareaControlled
        rows={5}
        className="flex-grow mr-2 min-h-10"
        name="text"
        placeholder="Ваше сообщение"
        control={control}
      />
      <Button className="self-end" color="red" type="submit">
        <svg
          className={`md:hidden`}
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
        >
          <path d="M1.53564 2L8.60671 9.07107L1.53564 16.1421" stroke="white" stroke-width="3" />
        </svg>
        <span className={`hidden md:block`}>Send</span>
      </Button>
    </form>
  );
};
