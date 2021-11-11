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
  const classes = [
    "rounded-primary text-medium whitespace-nowrap",
    "flex items-center justify-center",
    isFullWidth ? "w-full" : "",
    BUTTON_COLORS[color],
    BUTTON_SIZES[size],
    className ? className : "",
  ].join(" ");

  const handleOnClick = () => {
    onClick && onClick(id);
  };

  return (
    <button className={classes} style={style} id={id} type={type} disabled={disabled} onClick={handleOnClick}>
      {text} {children}
    </button>
  );
};
