import { IRemoteUiData } from "@kekekeks/remoteui/src";
import { observable } from "mobx";

import React, { useState } from "react";
import { PageBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import { PageRowsEditorStore } from "src/components/pageEditor/PageEditorStore";
import { AdminButton } from "src/components/common/AdminButton";
import { AdminOverlayDialog } from "src/components/common/AdminOverlayDialog";
import { PageRowsEditor } from "src/components/pageEditor/PageEditor";

export class AdminRemoteUiRowsStore implements IRemoteUiData {
  isValid: boolean = true;
  @observable editor: PageRowsEditorStore;

  constructor(rows: PageBlockRowDto[]) {
    if (rows == null) rows = [];
    this.editor = new PageRowsEditorStore(rows);
  }

  getData(): any {
    return this.editor.rows.map((r) => r.serialize());
  }
}

export const AdminRemoteUiRowsEditor = (props: { store: AdminRemoteUiRowsStore }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <AdminButton color={"primary"} onClick={() => setIsOpen(true)}>
        Edit
      </AdminButton>

      {isOpen ? (
        <AdminOverlayDialog cancel={() => setIsOpen(false)}>
          <div style={{ width: "80vw", height: "80vh", overflow: "scroll" }}>
            <PageRowsEditor store={props.store.editor} />
          </div>
        </AdminOverlayDialog>
      ) : null}
    </div>
  );
};
