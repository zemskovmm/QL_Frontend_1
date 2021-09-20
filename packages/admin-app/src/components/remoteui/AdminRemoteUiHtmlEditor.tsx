import { observable } from "mobx";

import React, { FunctionComponent} from "react";
import { observer } from "mobx-react";
import styles from "./AdminRemoteUiHtmlEditor.module.css";
import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { HtmlEditor } from "src/components";



export class AdminRemoteUiHtmlEditorStore implements IRemoteUiData {
  isValid: boolean = true;
  @observable editorState: string;

  constructor(html: string) {
    this.editorState = html || "<p></p>";
  }

  getData(): any {
    return this.editorState;
  }
}

type PropsType = {
  store: AdminRemoteUiHtmlEditorStore
}

export const AdminRemoteUiHtmlEditor: FunctionComponent<PropsType> = observer( ({ store }) => {
  return <HtmlEditor 
    data={store.editorState} 
    onChange={(value)=>{store.editorState = value}}/>
});
