import React from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";

export interface BasicInputBlockElement {
  id: string;
  label: string;
  placeholder: string;
}

export const BasicInputBlock = (props: BasicInputBlockElement) => {
  return (
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        <input id={props.id} type="text" placeholder={props.placeholder} />
      </label>
    </div>
  );
};

export const BasicInputBlockInfo: TypedBlockTypeInfo<BasicInputBlockElement> = {
  id: "basic-input-block",
  name: "BasicInputBlock",
  preview: preview,
  renderer: BasicInputBlock,
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
        customType: "DropdownSchemaText",
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
