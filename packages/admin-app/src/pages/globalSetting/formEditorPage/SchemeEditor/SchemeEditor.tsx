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
      id: "html",
      name: "html",
      type: "Custom",
      customType: "Html",
    },
  ],
};

const val = {
  html: "<b>Lorem ipsum</b> <i>dolor sit amet</i>",
};

const store = new RemoteUiEditorStore(createDefinition(def), val);

class RemoteUiCustomization implements IRemoteUiEditorStoreCustomization {
  getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
    if (type == "Html") return new AdminRemoteUiHtmlEditorStore(data);
    if (type == "Image") return new AdminRemoteUiImageFieldStore(data);
    if (type == "Rows") return new AdminRemoteUiRowsStore(data);
    return null!;
  }
}

export const SchemeEditor: FC<{ s: FormEditorStore | any }> = (s) => {
  return useObserver(() => (
    <div>
      <RemoteUiEditor store={store} customization={new RemoteUiCustomization()} />
    </div>
  ));
};
