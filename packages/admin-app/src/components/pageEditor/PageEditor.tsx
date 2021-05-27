import {
  PageEditorCellDialogStore,
  PageEditorCellStore,
  PageEditorRowStore,
  PageEditorStore,
  PageLanguageEditorStore,
  PageRowsEditorStore,
} from "./PageEditorStore";
import { useObserver } from "mobx-react";
import { AdminRemoteUiHtmlEditor, AdminRemoteUiHtmlEditorStore } from "src/components/remoteui/AdminRemoteUiHtmlEditor";
import {
  AdminRemoteUiImageFieldEditor,
  AdminRemoteUiImageFieldStore,
} from "src/components/remoteui/AdminRemoteUiImageEditor";
import { AvailableBlocks, BlockPresenter } from "@project/components/src/blocks";
import { AdminButton } from "src/components/common/AdminButton";
import { IRemoteUiData, IRemoteUiEditorCustomization, RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminSlider } from "src/components/common/AdminSlider";
import { AdminOverlayDialog } from "src/components/common/AdminOverlayDialog";
import { bind, dmap } from "src/utils/util";
import { AdminTabControl } from "src/components/common/AdminTabControl";
import "@kekekeks/remoteui/src/RemoteUiEditor.css";
import { AdminTextBox } from "src/components/common/AdminTextBox";
import { AllLanguages } from "@project/components/src/utils/langs";
import grid from "@project/components/src/styles/grid.module.css";
import { AdminRemoteUiRowsEditor, AdminRemoteUiRowsStore } from "src/components/remoteui/AdminRemoteUiRowsEditor";

const PageEditorCell = (props: { store: PageEditorCellStore }) => {
  const s = props.store;
  return useObserver(() => (
    <div>
      <div className="bg-white">
        <div className="relative">
          <div className={`py-10`}>
            {s.blockData == null ? null : <BlockPresenter blockType={s.blockType} blockData={s.blockData} />}
          </div>
          <div className="absolute top-0 right-0">
            <AdminButton color={"primary"} onClick={() => s.triggerEdit()}>
              ...
            </AdminButton>
            &nbsp;
            <AdminButton color={"danger"} onClick={() => s.triggerDelete()}>
              X
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  ));
};

const PageEditorRow = (props: { store: PageEditorRowStore }) => {
  return useObserver(() => (
    <div className="bg-gray-100 pt-2 pb-2">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ width: "100%" }} className={`p-4`}>
              <div className={`flex mb-3`}>
                <label className={`flex flex-col mr-6`}>
                  <span className={`mb-3`}>MaxWidth</span>
                  <input
                    type={"text"}
                    onChange={(e) => (props.store.maxWidth = e.target.value)}
                    value={props.store.maxWidth}
                  />
                </label>
                <label className={`flex flex-col`}>
                  <span className={`mb-3`}>backGround</span>
                  <input
                    type={"text"}
                    onChange={(e) => (props.store.backGround = e.target.value)}
                    value={props.store.backGround}
                  />
                </label>
              </div>
              <div>
                {props.store.cells.map((cell, i) => (
                  <div
                    className={`inline-block ${
                      grid["col-" + cell.size]
                    } border border-blue-400 box-border relative py-10`}
                    style={{ verticalAlign: "top" }}
                  >
                    <PageEditorCell key={i.toString()} store={cell} />
                  </div>
                ))}
                <div className="inline-block m-4" style={{ verticalAlign: "bottom" }}>
                  <AdminButton color={"primary"} onClick={() => props.store.addNewCell()}>
                    +
                  </AdminButton>
                </div>
              </div>
            </td>
            <td style={{ width: "0%", verticalAlign: "top" }}>
              <AdminButton color={"danger"} onClick={() => props.store.remove()}>
                X
              </AdminButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
};

class RemoteUiCustomization implements IRemoteUiEditorCustomization {
  getEditorFor(store: IRemoteUiData): any {
    if (store instanceof AdminRemoteUiHtmlEditorStore) return <AdminRemoteUiHtmlEditor store={store} />;
    if (store instanceof AdminRemoteUiImageFieldStore) return <AdminRemoteUiImageFieldEditor store={store} />;
    if (store instanceof AdminRemoteUiRowsStore) return <AdminRemoteUiRowsEditor store={store} />;
    return null;
  }
}

const PageEditorCellDialog = (props: { store: PageEditorCellDialogStore }) => {
  return useObserver(() => (
    <div>
      Size:
      <br />
      <AdminSlider min={1} max={12} value={props.store.size} onChange={(v) => (props.store.size = v)} />
      <br />
      Type:
      <select value={props.store.blockType} onChange={(e) => (props.store.blockType = e.currentTarget.value)}>
        <option value="">Select...</option>
        {AvailableBlocks.map((b) => (
          <option value={b.id}>{b.name}</option>
        ))}
      </select>
      {props.store.currentEditor == null ? null : (
        <div>
          <div style={{ margin: "5px", width: 600, maxWidth: "90vh", maxHeight: "70vh", overflow: "scroll" }}>
            <RemoteUiEditor store={props.store.currentEditor} customization={new RemoteUiCustomization()} />
          </div>
          <br />
          <AdminButton color={"primary"} onClick={() => props.store.save()}>
            Save
          </AdminButton>
        </div>
      )}
    </div>
  ));
};

export const PageRowsEditor = (props: { store: PageRowsEditorStore }) => {
  const s = props.store;

  return useObserver(() => (
    <>
      {s.cellEditor == null ? null : (
        <AdminOverlayDialog cancel={() => (s.cellEditor = null)}>
          <PageEditorCellDialog store={s.cellEditor} />
        </AdminOverlayDialog>
      )}

      {s.rows.map((r, i) => (
        <PageEditorRow key={i.toString()} store={r} />
      ))}
      <div className="content-center mt-8">
        <AdminButton color="primary" onClick={() => s.addRow()}>
          Add row
        </AdminButton>
      </div>
    </>
  ));
};

export const PageLanguageEditor = (props: { store: PageLanguageEditorStore }) => {
  return useObserver(() => (
    <div>
      <AdminTextBox id={"title"} label="Title" {...bind(props.store, "title")} />
      <AdminTextBox id={"url"} label="Url" {...bind(props.store, "url")} />
      <br />
      <PageRowsEditor store={props.store} />
    </div>
  ));
};

export const PageEditor = (props: { store: PageEditorStore }) => {
  const s = props.store;
  return useObserver(() => (
    <div>
      <AdminButton color="primary" onClick={() => s.save()}>
        Save
      </AdminButton>
      <br />
      <AdminTabControl
        tabs={dmap(AllLanguages, (lang, data) => ({
          id: lang,
          title: data.title,
          renderer:
            props.store.langs[lang] == null
              ? () => (
                  <div className="content-center m-4">
                    <AdminButton color="primary" onClick={(e) => s.addLang(lang)}>
                      Create Page Version
                    </AdminButton>
                  </div>
                )
              : () => <PageLanguageEditor store={props.store.langs[lang]} />,
        }))}
      />
    </div>
  ));
};
