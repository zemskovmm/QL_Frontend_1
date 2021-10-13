import React from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";

export interface BasicInputFileBlockElement {
  id: string;
  label: string;
  placeholder: string;
}

export const BasicInputFileBlock = (props: BasicInputFileBlockElement) => {
  return (
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        <input id={props.id} type="file" />
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
