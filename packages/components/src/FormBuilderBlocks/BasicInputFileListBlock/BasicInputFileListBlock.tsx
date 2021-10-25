import React, { useEffect } from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";
import { useContext, useState } from "preact/hooks";
import { ComponentHostDashboardContext } from "../HostLayout";

export interface BasicInputFileListBlockElement {
  id: string;
  label: string;
  buttonName: string;
}

export const BasicInputFileListBlock = (props: BasicInputFileListBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  const [file, observeFile] = useState<File[]>([]);

  return (
    <div className="py-12">
      <div>{props.label}</div>
      <label className={`flex`}>
        <span className={`mr-10`}>{props.buttonName}</span>
        <input
          id={props.id}
          type="file"
          onChange={(e) => {
            const files = file;
            if (e.target.files![0].name) {
              files.push(e.target.files![0]);
            }
            observeFile(files);
            // const req = new FormData();
            // for (let i = 0; files.length < i; i++) {
            //   req.append(`file ${i}`, files[i]);
            // }
            cl!.personalInfo[props.id] = files;
          }}
        />
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

export const BasicInputFileListBlockInfo: TypedBlockTypeInfo<BasicInputFileListBlockElement> = {
  id: "basic-input-file-list-block",
  name: "Basic Input FileList Block",
  preview: preview,
  renderer: BasicInputFileListBlock,
  initialData: {
    id: "",
    label: "",
    buttonName: "",
  },
  definition: {
    fields: [
      {
        id: "id",
        type: "Custom",
        customType: "DropdownSchemaFileList",
        name: "id",
      },
      {
        id: "label",
        type: "String",
        name: "label",
      },
      {
        id: "buttonName",
        type: "String",
        name: "buttonName",
      },
    ],
  },
};
