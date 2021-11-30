import { FC } from "react";

interface PropsType {
  className?: string;
}

export const Container: FC<PropsType> = ({ className = "", children }) => {
  return <div className={`mx-auto max-w-300 w-full ${className}`}>{children}</div>;
};
