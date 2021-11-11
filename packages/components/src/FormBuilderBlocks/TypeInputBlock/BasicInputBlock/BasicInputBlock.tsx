import React, { useContext } from "react";
import { ComponentHostDashboardContext } from "../../HostLayout";

export interface BasicInputBlockElement {
  schema: { id: string | number; required: boolean };
  label: string;
  placeholder: string;
}

export const BasicInputBlock = (props: BasicInputBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  return (
    <div className="pt-3">
      <label className={`flex flex-col`}>
        <span className={`text-help text-caption mb-2`}>{props.label}</span>
        {cl ? (
          <input
            id={String(props.schema.id)}
            required={props.schema.required}
            className={
              "p-1 px-4 rounded-sm border-2 focus:border-2 text-small text-gray-600 focus:text-gray-600 border-gray-200 focus:border-gray-400"
            }
            type="text"
            placeholder={props.placeholder}
            value={cl?.personalInfo[props.schema.id]}
            onChange={(e) => (cl!.personalInfo[props.schema.id] = e.target.value)}
          />
        ) : (
          "input text"
        )}
      </label>
    </div>
  );
};
