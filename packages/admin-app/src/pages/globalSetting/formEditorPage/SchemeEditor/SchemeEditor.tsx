import { FormEditorStore } from "../Editor/FormEditorStore";
import { FC } from "react";
import { useObserver } from "mobx-react";
import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiEditor,
  RemoteUiEditorConfiguration,
  RemoteUiEditorStore,
} from "@kekekeks/remoteui/src";
import { createDefinition } from "./SchemeEditorStore";
import "@kekekeks/remoteui/src/styles/RemoteUiEditor.css";
import { AdminRemoteUiHtmlEditorStore } from "../../../../components/remoteui/AdminRemoteUiHtmlEditor";
import { AdminRemoteUiImageFieldStore } from "../../../../components/remoteui/AdminRemoteUiImageEditor";
import { AdminRemoteUiRowsStore } from "../../../../components/remoteui/AdminRemoteUiRowsEditor";
const def = {
  fields: [
    {
      id: "items",
      type: "List",
      name: "Schema",
      listType: "schema",
    },
  ],
  subTypes: {
    schema: {
      fields: [
        {
          id: "id",
          type: "String",
          name: "id",
        },
        {
          id: "displayName",
          type: "String",
          name: "displayName",
        },
        {
          id: "type",
          type: "String",
          name: "type",
        },
      ],
    },
  },
};

const val = {
  html: "<b>Lorem ipsum</b> <i>dolor sit amet</i>",
};

class RemoteUiCustomization implements IRemoteUiEditorStoreCustomization {
  getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
    if (type == "Html") return new AdminRemoteUiHtmlEditorStore(data);
    if (type == "Image") return new AdminRemoteUiImageFieldStore(data);
    if (type == "Rows") return new AdminRemoteUiRowsStore(data);
    return null!;
  }
}

const store = new RemoteUiEditorStore(createDefinition(def), val, new RemoteUiCustomization());

export const SchemeEditor: FC<{ s: FormEditorStore | any }> = (s) => {
  return useObserver(() => (
    <div>
      <button onClick={() => alert("ок")}>Edit Scheme</button>
      <RemoteUiEditor store={store} />
    </div>
  ));
};
