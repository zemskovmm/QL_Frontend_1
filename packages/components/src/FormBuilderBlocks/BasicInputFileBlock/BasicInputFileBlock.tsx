import React, { useContext } from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";
import { ComponentHostDashboardContext } from "../HostLayout";

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
        <input
          id={String(props.schema?.id)}
          type="file"
          value={cl?.personalInfo[props.schema.id]}
          onChange={(e) => {
            cl!.personalInfo[props.schema.id] = e.target.files![0];
            console.log(cl?.personalInfo[props.schema.id]);
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
    schema: {
      id: "",
      required: false,
    },
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
