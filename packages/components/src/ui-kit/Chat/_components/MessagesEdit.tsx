import React, { FC, FormEvent, useState, useRef } from "react";
import { Button } from "@project/components/src/ui-kit/Button";
import { Textarea } from "@project/components/src/ui-kit/Textarea";
import cn from "classnames";
import CLIP_ICON from "@project/components/src/assets/icons/clip.svg";

type PropsType = {
  className?: string;
  onSendMessage: (text: string) => void;
  onFileChose: (file: File) => void;
  sendButtonName?: string;
  placeholder?: string;
};

export const MessagesEdit: FC<PropsType> = ({ className, onSendMessage, onFileChose, sendButtonName, placeholder }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message) {
      onSendMessage(message);
    }
    setMessage("");
  };

  const handleFileChange = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file = e.currentTarget.files?.item(0);
    if (file) {
      onFileChose(file);
    }
    e.currentTarget.value = "";
  };

  return (
    <div className={cn("flex", className)}>
      <input ref={fileRef} type="file" onChange={handleFileChange} style={{ display: "none" }} />
      <Textarea
        rows={1}
        value={message}
        className="flex-grow mr-2 h-full"
        placeholder={placeholder}
        iconSrc={CLIP_ICON}
        onIconClick={() => fileRef.current?.click()}
        onPressEnter={handleSendMessage}
        onChangeText={setMessage}
      />
      <Button className="self-end" text={sendButtonName} color="red" type="submit" onClick={handleSendMessage} />
    </div>
  );
};
