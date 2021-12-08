import React, { FunctionComponent } from "react";
import { Icon } from "@project/components/src/ui-kit/Icon";
import { Text } from "@project/components/src/ui-kit/Text";

export interface IconLabelPropsType {
  className?: string;
  iconSrc: string;
  text: string;
  subText: string;
}

export const IconLabel: FunctionComponent<IconLabelPropsType> = ({ className = "", iconSrc, text, subText }) => {
  const clazz = ["flex", className].join(" ");

  return (
    <div className={clazz}>
      <Icon className="mr-5" src={iconSrc} alt={text} size="11" />
      <div className="flex flex-col justify-around">
        <Text text={text} size="large" weight="bold" />
        <Text text={subText} size="caption" color="help" />
      </div>
    </div>
  );
};
