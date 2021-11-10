import React from "react";
import { TypedBlockTypeInfo } from "../../blocks/blocks-info";
import preview from "./preview.jpg";
import { BasicInputFileListBlock } from "./BasicInputFileListBlock/BasicInputFileListBlock";
import { BasicInputFileBlock } from "./BasicInputFileBlock/BasicInputFileBlock";
import { BasicInputBlock } from "./BasicInputBlock/BasicInputBlock";

export interface TypeInputBlockElement {
  schema: { id: string | number; required: boolean; type: string | null };
  label: string;
  placeholder: string;
}

export const TypeInputBlock = (props: TypeInputBlockElement) => {
  return (
    <>
      {props.schema.type === "fileList" ? (
        <BasicInputFileListBlock
          label={props.label}
          buttonName={props.placeholder}
          schema={{ id: props.schema.id, required: props.schema.required }}
        />
      ) : props.schema.type === "file" ? (
        <BasicInputFileBlock
          label={props.label}
          schema={{ id: props.schema.id, required: props.schema.required }}
          placeholder={props.placeholder}
        />
      ) : props.schema.type === "text" ? (
        <BasicInputBlock
          label={props.label}
          schema={{ id: props.schema.id, required: props.schema.required }}
          placeholder={props.placeholder}
        />
      ) : (
        ""
      )}
    </>
  );
};

export const TypeInputBlockInfo: TypedBlockTypeInfo<TypeInputBlockElement> = {
  id: "type-input-block",
  name: "TypeInputBlock",
  preview: preview,
  renderer: TypeInputBlock,
  initialData: {
    schema: {
      id: "",
      required: false,
      type: null,
    },
    label: "",
    placeholder: "",
  },
  definition: {
    fields: [
      {
        id: "schema",
        type: "Custom",
        customType: "DropdownSchema",
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
