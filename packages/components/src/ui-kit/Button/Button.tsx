import React, { FunctionComponent } from "react";
import { BUTTON_COLORS, BUTTON_SIZES } from "./_constats";
import { ButtonPropsType } from "./_types";

export const Button: FunctionComponent<ButtonPropsType> = ({
  className,
  style,
  id,
  text,
  type,
  color = "default",
  size = "default",
  disabled = false,
  isFullWidth = false,
  onClick,
  children,
}) => {
  let classes = `text-white font-bold py-2 px-4 rounded inline-block transition ${className} `;
  if (color == "default") classes += "bg-gray-500 hover:bg-gray-100 hover:text-black";
  if (color == "primary") classes += "bg-blue-500 hover:bg-blue-100 hover:text-black";
  if (color == "success") classes += "bg-green-400 hover:bg-green-100 hover:text-black";
  if (color == "danger") classes += "bg-red-600 hover:bg-red-900";
  if (color == "red") classes += "bg-red-500 hover:bg-red-400";
  if (color == "gray") classes += "bg-gray-400 hover:bg-gray-100 hover:text-black";
  if (color == "save") classes += "bg-blue-500 hover:bg-blue-100 hover:text-black fixed right-10 bottom-10 z-50";

  const handleOnClick = () => {
    onClick && onClick(id);
  };

  return (
    <button className={classes} style={style} id={id} type={type} disabled={disabled} onClick={handleOnClick}>
      {text} {children}
    </button>
  );
};
