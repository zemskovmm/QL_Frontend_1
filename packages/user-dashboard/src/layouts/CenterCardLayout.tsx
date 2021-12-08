import { Text } from "@project/components/src/ui-kit/Text";
import { FC } from "react";

type PropsType = {
  title: string;
  subtitle?: string;
};

export const CenterCardLayout: FC<PropsType> = ({ title, subtitle, children }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-9 max-w-128"
      style={{ border: "2px solid #EFF3FA", borderRadius: "10px" }}
    >
      <div className="flex flex-col mb-10">
        <Text text={title} size="title-large" weight="bold" isCenter />
        <Text className="mt-4" text={subtitle || ""} size="medium" weight="semibold" isCenter />
      </div>
      {children}
    </div>
  );
};
