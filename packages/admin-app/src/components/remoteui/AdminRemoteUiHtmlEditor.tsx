import { observable } from "mobx";
import Draft, { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";
import React, { lazy, Suspense } from "react";
import { useObserver } from "mobx-react";
import styles from "./AdminRemoteUiHtmlEditor.module.css";
import { IRemoteUiData } from "@kekekeks/remoteui/src";

export class AdminRemoteUiHtmlEditorStore implements IRemoteUiData {
  isValid: boolean = true;
  @observable.ref editorState: EditorState;

  constructor(html: string) {
    html = html || "<p></p>";
    const converted = Draft.convertFromHTML(html);
    this.editorState = EditorState.createWithContent(stateFromHTML(html));
  }

  getData(): any {
    return stateToHTML(this.editorState.getCurrentContent());
  }
}

export const Editor = lazy(() => import("react-draft-wysiwyg").then((module) => ({ default: module.Editor })));

export const AdminRemoteUiHtmlEditor = (props: { store: AdminRemoteUiHtmlEditorStore }) => {
  return useObserver(() => (
    <Suspense fallback={<div>Loading...</div>}>
      <Editor
        toolbarClassName={styles.rdwStorybookToolbar}
        wrapperClassName={styles.rdwStorybookWrapper}
        editorClassName={styles.rdwStorybookEditor}
        editorState={props.store.editorState}
        onEditorStateChange={(s) => (props.store.editorState = s)}
        placeholder="Lorem ipsum dolor sit amet"
      />
    </Suspense>
  ));
};
