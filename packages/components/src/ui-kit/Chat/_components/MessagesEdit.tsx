import { Button } from "@project/components/src/ui-kit/Button";
import { TextareaControlled } from "@project/components/src/form/TextareaControlled";
import { useForm } from "react-hook-form";
import React, { FC, FormEvent, useRef } from "react";
import cn from "classnames";
import CLIP_ICON from "@project/components/src/assets/icons/clip.svg";

type MessagesType = {
  text: string;
};

type PropsType = {
  className?: string;
  onSendMessage: (text: string) => void;
  onFileChose: (file: File) => void;
};

export const MessagesEdit: FC<PropsType> = ({ className, onSendMessage, onFileChose }) => {
  const { handleSubmit, control, setValue } = useForm<MessagesType>();
  const fileRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSendMessage = ({ text }: MessagesType) => {
    if (text) {
      onSendMessage(text);
    }
    setValue("text", "");
  };

  const handleImageChange = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file = e.currentTarget.files?.item(0);
    if (file) {
      onFileChose(file);
    }
  };

  return (
    <form className={cn("flex", className)} onSubmit={handleSubmit(handleSendMessage) as any}>
      <input ref={fileRef} type="file" onChange={handleImageChange} style={{ display: "none" }} />
      <TextareaControlled
        rows={1}
        className="flex-grow mr-2 h-full"
        name="text"
        placeholder="Ваше сообщение"
        iconSrc={CLIP_ICON}
        onIconClick={() => fileRef.current?.click()}
        control={control}
        onPressEnter={() => submitButtonRef.current?.click()}
      />
      // TODO fix this mess!
      {/*<Button ref={submitButtonRef} className="self-end" text="Отправить" color="red" type="submit" />*/}
    </form>
  );
};
