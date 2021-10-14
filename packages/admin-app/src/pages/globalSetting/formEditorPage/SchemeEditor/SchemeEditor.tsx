import { FormEditorStore } from "../Editor/FormEditorStore";
import { FC } from "react";
import { useObserver } from "mobx-react";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import "@kekekeks/remoteui/src/styles/RemoteUiEditor.css";
import { AdminOverlayDialog } from "../../../../components/common/AdminOverlayDialog";
import { AdminButton } from "../../../../components/common/AdminButton";
import { FormSchemaFieldDto } from "../../../../interfaces/GlobalSettingsDto";

export const SchemeEditor: FC<{ s: FormEditorStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <button onClick={() => s.schemaEditor?.open()}>Edit Scheme</button>
      {s.schemaEditor?.blockData && (
        <div>
          {s.schemaEditor.blockData.schema.map((el: FormSchemaFieldDto) => (
            <div className={`flex flex-col `}>
              <span>ID: {el.id}</span>
              <span>DN: {el.displayName}</span>
              <span>TY: {el.type}</span>
              <span>RQ: {String(el.required)}</span>
              <span>HI: {String(el.hide)}</span>
            </div>
          ))}
        </div>
      )}
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
