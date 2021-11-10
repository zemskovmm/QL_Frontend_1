import React, { useContext, useState } from "react";
import { ComponentHostDashboardContext } from "../../HostLayout";
import { without } from "lodash";

export interface BasicInputFileListBlockElement {
  schema: { id: string | number; required: boolean };
  label: string;
  buttonName: string;
}

export const BasicInputFileListBlock = (props: BasicInputFileListBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  const [fileState, setFileState] = useState(true);

  return (
    <div className="py-12">
      <div>{props.label}</div>
      <label className={`flex`}>
        <span className={`mr-10`}>{props.buttonName}</span>
        {cl ? (
          <input
            id={String(props.schema?.id)}
            type="file"
            value={cl?.personalInfo[props.schema.id]}
            onChange={async (e) => {
              if (e.target.files) {
                const data = new FormData();
                data.append("UploadedFile", e.target.files[0]);
                try {
                  const response: any = await cl?.postMedia(data);
                  cl.personalInfo[props.schema.id] = [...cl.personalInfo[props.schema.id], response.id];
                  setFileState(false);
                  setFileState(true);
                  e.target.value = "";
                } catch (e) {
                  alert("File not allowed");
                }
              }
            }}
          />
        ) : (
          "input file list"
        )}
      </label>
      <div className={`flex`}>
        <div>
          {cl && fileState
            ? cl.personalInfo[props.schema.id]?.map((el: number) => (
                <div>
                  {el}
                  <button
                    type={"button"}
                    onClick={async () => {
                      try {
                        cl?.deleteMedia(el);
                        cl.personalInfo[props.schema.id] = without(cl.personalInfo[props.schema.id], el);
                        setFileState(false);
                        setFileState(true);
                      } catch (e) {
                        alert(e);
                      }
                    }}
                  >
                    remove
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};
