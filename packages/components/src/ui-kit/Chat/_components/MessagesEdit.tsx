import { Button } from "@project/components/src/ui-kit/Button";
import { TextareaControlled } from "@project/components/src/form/TextareaControlled";
import { useForm } from "react-hook-form";
import React, { FC } from "react"
import cn from "classnames"

type PropsType = {
  className?: string;
  onSendMessage: (text:string)=>void
};
type MessagesType={
  text:string
}

export const MessagesEdit: FC<PropsType> = ({ className,onSendMessage }) => {
  const { handleSubmit, control, setValue } = useForm<MessagesType>();

  const handleSendMessage = ({text}: MessagesType) => {
    if(text){
      onSendMessage(text);
    }
    setValue("text", "");
  };

  return (
    <form className={cn("flex",className)} onSubmit={handleSubmit(handleSendMessage) as any}>
      <TextareaControlled
        rows={2}
        className="flex-grow mr-2"
        name="text"
        placeholder="Ваше сообщение"
        control={control}
      />
      <Button className="self-end" text="Отправить" color="red" type="submit" />
    </form>
  );
};
