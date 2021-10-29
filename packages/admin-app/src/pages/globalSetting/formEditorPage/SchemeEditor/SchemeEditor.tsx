import { FormEditorStore } from "../Editor/FormEditorStore";
import { FC } from "react";
import { useObserver } from "mobx-react";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import "@kekekeks/remoteui/src/styles/RemoteUiEditor.css";
import { AdminOverlayDialog } from "../../../../components/common/AdminOverlayDialog";
import { AdminButton } from "../../../../components/common/AdminButton";
import { FormSchemaFieldDto } from "../../../../interfaces/GlobalSettingsDto";
import style from "./SchemeEditor.module.css";

export const SchemeEditor: FC<{ s: FormEditorStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      {s.schemaEditor?.blockData && (
        <div className={`mb-4`}>
          {s.schemaEditor.blockData.map((el: FormSchemaFieldDto, index: number) => (
            <div className={`flex flex-col border px-2`}>
              <span>ID: {el.id}</span>
              <span>DN: {el.displayName}</span>
              <div className={`flex justify-between text-center`}>
                <span className={`w-4/12`}>TY: {el.type}</span>
                <span className={`w-4/12`}>RQ: {String(el.required)}</span>
                <span className={`w-4/12`}>HI: {String(el.hide)}</span>
              </div>
              <AdminButton color={"primary"} onClick={() => s.schemaEditor?.open(el, index)}>
                Edit Scheme {index}
              </AdminButton>
            </div>
          ))}
        </div>
      )}
      <AdminButton color={"primary"} onClick={() => s.schemaEditor?.addNew()}>
        Create New
      </AdminButton>
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
              {s.schemaEditor?.currentSchemeEditor && (
                <div className={`${style.trustMePleaseAndITrustYou}`}>
                  <RemoteUiEditor store={s.schemaEditor?.currentSchemeEditor} />
                </div>
              )}
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
