import React, { FunctionComponent } from "react";
import cn from "classnames";

export type ButtonCollorType = keyof typeof BUTTON_COLORS;

export const BUTTON_COLORS = {
  default: "text-white bg-gray-500 hover:bg-gray-100 hover:text-black",
  primary: "text-white bg-blue-500 hover:bg-blue-100 hover:text-black",
  success: "text-white bg-green-400 hover:bg-green-100 hover:text-black",
  danger: "text-white bg-red-600 hover:bg-red-900",
  red: "text-white bg-red-500 hover:bg-red-400",
  gray: "text-black bg-button-secondary hover:bg-gray-300 ",
  save: "text-white bg-blue-500 hover:bg-blue-100 hover:text-black fixed right-10 bottom-10 z-50",
};

export type ButtonPropsType = {
  className?: string;
  style?: any;
  id?: string;
  text?: string;
  type?: "submit";
  color?: ButtonCollorType;
  disabled?: boolean;
  onClick?: (id?: string) => void;
};

export const Button: FunctionComponent<ButtonPropsType> = ({
  className,
  style,
  id,
  text,
  type,
  color = "default",
  disabled = false,
  onClick,
  children,
}) => {
  const handleOnClick = () => {
    onClick && onClick(id);
  };

  return (
    <button
      className={cn(" py-2 px-4 rounded inline-block transition", BUTTON_COLORS[color], className)}
      style={style}
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {text} {children}
    </button>
  );
};
