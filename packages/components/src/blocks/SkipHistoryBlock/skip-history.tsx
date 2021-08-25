import React from "react";
import { TypedBlockTypeInfo } from "../blocks-info";
import preview from "./preview.jpg";

export const SkipHistoryBlockInfo: TypedBlockTypeInfo<any> = {
  id: "skipHistoryBlock",
  name: "Skip history",
  preview: preview,
  initialData: {},
  definition: {
    fields: [],
  },
  renderer: () => <div className={``}></div>,
};
