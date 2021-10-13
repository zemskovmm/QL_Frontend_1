import React from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";

export interface BasicInputFileListBlockElement {
  id: string;
  label: string;
  placeholder: string;
}

export const BasicInputFileListBlock = (props: BasicInputFileListBlockElement) => {
  return (
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        <input id={props.id} type="file" />
      </label>
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
    placeholder: "",
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
        id: "placeholder",
        type: "String",
        name: "placeholder",
      },
    ],
  },
};
