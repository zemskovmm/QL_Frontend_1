import React from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";
import { useContext } from "preact/hooks";
import { ComponentHostDashboardContext } from "../HostLayout";

export interface BasicInputFileBlockElement {
  id: string;
  label: string;
  placeholder: string;
}

export const BasicInputFileBlock = (props: BasicInputFileBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  return (
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        <input
          id={props.id}
          type="file"
          value={cl?.personalInfo[props.id]}
          onChange={(e) => {
            cl!.personalInfo[props.id] = e.target.files![0];
            console.log(cl?.personalInfo[props.id]);
          }}
        />
      </label>
    </div>
  );
};

export const BasicInputFileBlockInfo: TypedBlockTypeInfo<BasicInputFileBlockElement> = {
  id: "basic-input-file-block",
  name: "BasicInputFileBlock",
  preview: preview,
  renderer: BasicInputFileBlock,
  initialData: {
    id: "",
    label: "",
    placeholder: "",
  },
  definition: {
    fields: [
      {
        id: "id",
        type: "Custom",
        customType: "DropdownSchemaFile",
        name: "id",
      },
      {
        id: "label",
        type: "String",
        name: "label",
      },
      {
        id: "placeholder",
        type: "String",
        name: "placeholder",
      },
    ],
  },
};
