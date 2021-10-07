import { FormEditorStore } from "../Editor/FormEditorStore";
import { FC } from "react";
import { useObserver } from "mobx-react";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import "@kekekeks/remoteui/src/styles/RemoteUiEditor.css";
import { AdminOverlayDialog } from "../../../../components/common/AdminOverlayDialog";
import { AdminButton } from "../../../../components/common/AdminButton";

export const SchemeEditor: FC<{ s: FormEditorStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <button onClick={() => s.schemaEditor?.open()}>Edit Scheme</button>
      {s.schemaEditor?.editSchemaShow && (
        <AdminOverlayDialog cancel={() => s.schemaEditor?.dismiss()}>
          <div>
            <div
              style={{
                margin: "5px",
                width: "100%",
                maxWidth: "90vw",
                minWidth: "600px",
                maxHeight: "70vh",
                overflow: "scroll",
              }}
            >
              {s.schemaEditor?.currentSchemeEditor && <RemoteUiEditor store={s.schemaEditor?.currentSchemeEditor} />}
            </div>
            <br />
            <AdminButton color={"primary"} onClick={() => s.schemaEditor?.save()}>
              Save
            </AdminButton>
          </div>
        </AdminOverlayDialog>
      )}
    </div>
  ));
};
