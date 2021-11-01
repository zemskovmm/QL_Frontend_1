import React, { useContext } from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.png";
import { ComponentHostDashboardContext } from "../HostLayout";
// import { useContext } from "preact/hooks";
// import { ComponentHostDashboardContext } from ;

export interface BasicInputBlockElement {
  schema: { id: string | number; required: boolean };
  label: string;
  placeholder: string;
}

export const BasicInputBlock = (props: BasicInputBlockElement) => {
  const cl = useContext(ComponentHostDashboardContext);
  console.log(cl?.personalInfo);
  return (
    <div className="py-12">
      <label className={`flex`}>
        <span className={`mr-10`}>{props.label}</span>
        <input
          id={String(props.schema.id)}
          required={props.schema.required}
          type="text"
          placeholder={props.placeholder}
          value={cl?.personalInfo[props.schema.id]}
          onChange={(e) => (cl!.personalInfo[props.schema.id] = e.target.value)}
        />
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
        id: "schema",
        type: "Custom",
        customType: "DropdownSchemaText",
        name: "schema",
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