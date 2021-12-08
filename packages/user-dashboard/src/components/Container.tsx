import { FC } from "react";
import cn from "classnames";

interface PropsType {
  className?: string;
}

export const Container: FC<PropsType> = ({ className, children }) => {
  return <div className={cn("box-content mx-auto px-4 md:px-8 max-w-320", className)}>{children}</div>;
};
