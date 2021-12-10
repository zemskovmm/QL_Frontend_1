import React, { FC } from "react";
import { useFormBuilderContext } from "../../FormBuilderProvider";

export interface BasicInputBlockElement {
  schema: { id: string | number; required: boolean };
  label: string;
  placeholder: string;
}

export const BasicInputBlock: FC<BasicInputBlockElement> = ({ schema, label, placeholder }) => {
  const { info, setValueInfo } = useFormBuilderContext();
  const inputValue = info[schema.id] ? info[schema.id] : "";

  return (
    <div className="pt-3">
      <label className={`flex flex-col`}>
        <span className={`text-help text-caption mb-2`}>{label}</span>
        <input
          id={String(schema.id)}
          required={schema.required}
          className={
            "p-1 px-4 rounded-sm border-2 focus:border-2 text-small text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400"
          }
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setValueInfo(schema.id, e.target.value)}
        />
      </label>
    </div>
  );
};
