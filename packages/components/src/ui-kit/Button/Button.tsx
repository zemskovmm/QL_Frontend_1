import React, { FC, forwardRef } from "react";
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
  plus?: boolean;
};

export const Button: FC<ButtonPropsType> = (
  { className, style, id, text, type, color = "default", disabled = false, onClick, children, plus },
  ref
) => {
  const handleOnClick = () => {
    onClick && onClick(id);
  };

  return (
    <button
      ref={ref}
      className={cn(" py-2 px-4 rounded inline-block transition flex justify-center ", BUTTON_COLORS[color], className)}
      style={style}
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {plus && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          className={`mr-3`}
          style={{ marginTop: "5px" }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.71667 0C5.55098 0 5.41667 0.134315 5.41667 0.3V5.41667H0.3C0.134315 5.41667 0 5.55098 0 5.71667V7.28333C0 7.44902 0.134315 7.58333 0.3 7.58333H5.41667V12.7C5.41667 12.8657 5.55098 13 5.71667 13H7.28333C7.44902 13 7.58333 12.8657 7.58333 12.7V7.58333H12.7C12.8657 7.58333 13 7.44902 13 7.28333V5.71667C13 5.55098 12.8657 5.41667 12.7 5.41667H7.58333V0.3C7.58333 0.134315 7.44902 0 7.28333 0H5.71667Z"
            fill="white"
          />
        </svg>
      )}
      {text} {children}
    </button>
  );
};
