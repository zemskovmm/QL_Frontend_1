import React, { useContext } from "react";
import { ComponentHostDashboardContext } from "../../HostLayout";

export interface BasicInputFileBlockElement {
  label: string;
  placeholder: string;
  schema: { id: string | number; required: boolean };
}

export const BasicInputFileBlock = (props: BasicInputFileBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  return (
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        {cl ? (
          <input
            id={String(props.schema?.id)}
            type="file"
            value={cl?.personalInfo[props.schema.id]}
            onChange={(e) => {
              cl.personalInfo[props.schema.id] = e.target.files![0];
            }}
          />
        ) : (
          ""
        )}
      </label>
    </div>
  );
};
