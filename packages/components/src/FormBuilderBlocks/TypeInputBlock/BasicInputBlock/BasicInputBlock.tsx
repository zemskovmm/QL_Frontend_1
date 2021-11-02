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
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        {cl ? (
          <input
            id={String(props.schema.id)}
            required={props.schema.required}
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
