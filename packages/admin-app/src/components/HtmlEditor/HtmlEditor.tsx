import React, { FunctionComponent, useState } from "react";
import { observer } from "mobx-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import HtmlPresenterStyle from "@project/components/src/ui/HtmlPresenter/htmlPresenter.module.css";

type PropsType = {
  className?: string;
  data: string;
  onChange: (value: string) => void;
};

export const HtmlEditor: FunctionComponent<PropsType> = observer(({ className, data, onChange }) => {
  const [type, setType] = useState(true);
  return (
    <div className={`flex flex-col`}>
      <button
        onClick={() => setType(!type)}
        className={`text-white font-bold py-1 px-2 rounded inline-block bg-red-600 hover:bg-red-900 ml-auto mb-4`}
      >
        {type ? "Edit on HTML" : "Edit on Editor"}
      </button>
      <div className={`${HtmlPresenterStyle.text} ${className} ${type ? "" : "hidden"}`}>
        <CKEditor
          editor={DecoupledEditor}
          data={data}
          onChange={(event, editor) => {
            onChange(editor.getData());
          }}
          onReady={(editor) => {
            // Insert the toolbar before the editable area.
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
          }}
        />
      </div>
      <textarea
        value={data}
        className={`flex border-2 border-indigo-600 outline-none ${!type ? "" : "hidden"}`}
        style={{ minHeight: "200px" }}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
});
