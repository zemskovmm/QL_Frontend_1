import { Button } from "@project/components/src/ui-kit/Button";
import { TextareaControlled } from "@project/components/src/form/TextareaControlled";
import { IconButton } from "@project/components/src/ui-kit/IconButton";
import { useForm } from "react-hook-form";
import React, { FC,FormEvent,useRef } from "react"
import cn from "classnames"
import CLIP_ICON from "@project/components/src/assets/icons/clip.svg";
import { ChangeEventHandler } from "react-dom/node_modules/@types/react";

type PropsType = {
  className?: string;
  onSendMessage: (text:string)=>void
};
type MessagesType={
  text:string
}

export const MessagesEdit: FC<PropsType> = ({ className,onSendMessage }) => {
  const { handleSubmit, control, setValue } = useForm<MessagesType>();
  const fileRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const handleSendMessage = ({text}: MessagesType) => {
    if(text){
      onSendMessage(text);
    }
    setValue("text", "");
  };

  const handleImageChange=(e:FormEvent<HTMLInputElement>) =>{
    e.preventDefault();
    
    let file = e.currentTarget.files;
    console.log({
      file,
    })
  }

  return (
    <form className={cn("flex",className)} onSubmit={handleSubmit(handleSendMessage) as any}>
      {/* <input ref={fileRef} type="file" onChange={handleImageChange} style={{display:"none"}} />
      <IconButton src={CLIP_ICON} size="4" onClick={()=>fileRef.current?.click()} /> */}
      <TextareaControlled
        rows={2}
        className="flex-grow mr-2"
        name="text"
        placeholder="Ваше сообщение"
        control={control}
        onPressEnter={()=>submitButtonRef.current?.click()}
      />
      <Button ref={submitButtonRef} className="self-end" text="Отправить" color="red" type="submit" />
    </form>
  );
};
