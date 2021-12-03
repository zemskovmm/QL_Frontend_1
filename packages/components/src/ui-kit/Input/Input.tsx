import React, { FunctionComponent,forwardRef } from "react";
import { Text } from "@project/components/src/ui-kit/Text";

export type InputTypeType = "text" | "email" | "tel" | "password";

export interface InputPropsType {
  className?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  helperText?: string;
  type?: InputTypeType;
  sign?: boolean;
}

export const Input: FunctionComponent<InputPropsType> = forwardRef<HTMLInputElement,InputPropsType>(({
  
  className,
  label,
  value,
  placeholder,
  isError = false,
  helperText = "",
  type,
  sign,
  ...fields
},ref) => {
  const inputClass = sign
    ? [
        "py-1 px-4 rounded-sm border-2 focus:border-blue-400 text-small leading-7	",
        isError
          ? "text-red-600 focus:text-red-600 border-red-200 focus:border-red-400"
          : "text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400",
      ].join(" ")
    : [
        "p-1 px-4 rounded-sm border-2 focus:border-2 text-small",
        isError
          ? "text-red-600 focus:text-red-600 border-red-200 focus:border-red-400"
          : "text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400",
      ].join(" ");

  const textColor = isError ? "error" : "help";

  return (
    <label className={`flex flex-col ${className}`}>
      {label && <Text className="mb-2" text={label} color={textColor} size="caption" />}
      <input ref={ref} className={inputClass} type={type} value={value} placeholder={placeholder} {...fields} />
      {helperText && <Text className="mt-2" text={helperText} color={textColor} size="caption" />}
    </label>
  );
});
