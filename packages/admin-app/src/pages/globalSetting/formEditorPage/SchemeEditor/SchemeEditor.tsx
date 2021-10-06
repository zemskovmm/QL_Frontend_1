import { FormEditorStore } from "../Editor/FormEditorStore";
import { FC } from "react";
import { useObserver } from "mobx-react";
import { RemoteUiEditor } from "@kekekeks/remoteui/src";
import "@kekekeks/remoteui/src/styles/RemoteUiEditor.css";

export const SchemeEditor: FC<{ s: FormEditorStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <button onClick={() => alert("ок")}>Edit Scheme</button>
      {s.schemaEditor?.currentSchemeEditor && <RemoteUiEditor store={s.schemaEditor?.currentSchemeEditor} />}
    </div>
  ));
};
