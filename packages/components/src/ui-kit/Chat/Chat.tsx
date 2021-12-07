import React, { FC } from "react";
import cn from "classnames";
import { MessageList } from "./_components/MessageList";
import { MessagesEdit } from "./_components/MessagesEdit";
import { MessageListProvider } from "./_components/MessageListProvider";

export type ChatPropsType = {
  className?: string;
  provider: MessageListProvider;
  onBeforeMessages: (id: number) => void;
  onAfterMessages: (id: number) => void;
  onSendMessage: (text: string) => void;
  onFileChose: (file: File) => void;
  fileId?: number;
  fileName?: string;
  sendButtonName?: string;
  placeholder?: string;
};

export const Chat: FC<ChatPropsType> = ({
  className,
  provider,
  onBeforeMessages,
  onAfterMessages,
  onSendMessage,
  onFileChose,
  sendButtonName = "Send",
  placeholder = "Enter your message",
}) => {
  return (
    <div className={cn("relative h-full", className)}>
      <div className={cn("absolute top-0 left-0 h-full w-full flex flex-col gap-2")}>
        <MessageList
          className="flex-grow flex-shrink"
          provider={provider}
          onBeforeMessages={onBeforeMessages}
          onAfterMessages={onAfterMessages}
        />
        <MessagesEdit
          placeholder={placeholder}
          sendButtonName={sendButtonName}
          onSendMessage={onSendMessage}
          onFileChose={onFileChose}
        />
      </div>
    </div>
  );
};
