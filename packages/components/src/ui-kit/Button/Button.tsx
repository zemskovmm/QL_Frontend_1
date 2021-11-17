import React, { FunctionComponent } from "react";
import { BUTTON_COLORS } from "./_constats";
import { ButtonPropsType } from "./_types";
import cn from "classnames";

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
  let classes = ` ${className} `;
  
  const handleOnClick = () => {
    onClick && onClick(id);
  };

  return (
    <button 
      className={cn(
        "text-white font-bold py-2 px-4 rounded inline-block transition",
        BUTTON_COLORS[color],
        className
      )} 
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
