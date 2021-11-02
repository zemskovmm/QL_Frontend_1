import React, { useContext } from "react";
import { ComponentHostDashboardContext } from "../../HostLayout";

export interface BasicInputFileListBlockElement {
  schema: { id: string | number; required: boolean };
  label: string;
  buttonName: string;
}

export const BasicInputFileListBlock = (props: BasicInputFileListBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  const file: File[] = [];
  return (
    <div className="py-12">
      <div>{props.label}</div>
      <label className={`flex`}>
        <span className={`mr-10`}>{props.buttonName}</span>
        {cl ? (
          <input
            id={String(props.schema?.id)}
            type="file"
            onChange={(e) => {
              const files = file;
              if (e.target.files![0].name) {
                files.push(e.target.files![0]);
              }
              cl.personalInfo[props.schema.id] = files;
            }}
          />
        ) : (
          ""
        )}
      </label>
      <div className={`flex`}>
        <div>
          {file.length}
          {file.map((el) => (
            <div>
              {el.name} <button>remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
