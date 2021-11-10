import React, { useContext, useState } from "react";
import { ComponentHostDashboardContext } from "../../HostLayout";

export interface BasicInputFileBlockElement {
  label: string;
  placeholder: string;
  schema: { id: string | number; required: boolean };
}

export const BasicInputFileBlock: any = (props: BasicInputFileBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  const [fileState, setFileState] = useState(false);

  if (cl) {
    setFileState(Boolean(cl?.personalInfo[props.schema.id]));
  }

  return (
    <div className="py-12">
      {!cl ? (
        "input file"
      ) : fileState ? (
        <div>
          {cl.personalInfo[props.schema.id]}{" "}
          <button
            type={"button"}
            onClick={async () => {
              try {
                cl?.deleteMedia(cl.personalInfo[props.schema.id]);
                cl.personalInfo[props.schema.id] = null;
                setFileState(false);
              } catch (e) {
                alert(e);
              }
            }}
          >
            remove
          </button>
        </div>
      ) : (
        <label className={`flex`}>
          <span className={`mr-10`}>{props.label}</span>
          <input
            id={String(props.schema?.id)}
            type="file"
            onChange={async (e) => {
              if (e.target.files) {
                const data = new FormData();
                data.append("UploadedFile", e.target.files[0]);
                try {
                  const response: any = await cl?.postMedia(data);
                  cl.personalInfo[props.schema.id] = response.id;
                  setFileState(true);
                } catch (e) {
                  alert("File not allowed");
                }
              }
            }}
          />
        </label>
      )}
    </div>
  );
};
