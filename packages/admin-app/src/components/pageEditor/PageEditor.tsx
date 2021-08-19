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
import "@kekekeks/remoteui/src/styles/RemoteUiEditor.css";
import { AdminTextBox } from "src/components/common/AdminTextBox";
import { AllLanguages } from "@project/components/src/utils/langs";
import grid from "@project/components/src/styles/grid.module.css";
import { AdminRemoteUiRowsEditor, AdminRemoteUiRowsStore } from "src/components/remoteui/AdminRemoteUiRowsEditor";
import { useEffect, useState } from "react";

import styles from "./PageEditor.module.css";

const PageEditorCell = (props: { store: PageEditorCellStore }) => {
  const s = props.store;
  return useObserver(() => (
    <div>
      <div className="bg-white">
        <div className="relative">
          <div className={`py-12`}>
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
  const s = props.store;
  return useObserver(() => (
    <div className="bg-gray-100 pt-2 pb-2">
      <div style={{ width: "100%" }}>
        <div>
          <div>
            <div style={{ width: "100%" }} className={`p-4`}>
              <div className={`flex mb-3`}>
                <div className={`flex flex-col mr-6`}>
                  <span>MaxWidth</span>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"width"}
                      onChange={(e) => (props.store.maxWidth = e.target.value)}
                      value={"100%"}
                      checked={props.store.maxWidth === "100%"}
                    />
                    <span className={`ml-3`}>100%</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"width"}
                      onChange={(e) => (props.store.maxWidth = e.target.value)}
                      value={"1170px"}
                      checked={props.store.maxWidth === "1170px"}
                    />
                    <span className={`ml-3`}>1170px</span>
                  </label>
                </div>
                <div className={`flex flex-col`}>
                  <span>backGround</span>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"bg"}
                      onChange={(e) => (props.store.backGround = e.target.value)}
                      value={`#fff`}
                      checked={props.store.backGround === "#fff"}
                    />
                    <span className={`ml-3`}>White</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"bg"}
                      onChange={(e) => (props.store.backGround = e.target.value)}
                      value={`#F9FAFD`}
                      checked={props.store.backGround === "#F9FAFD"}
                    />
                    <span className={`ml-3`}>White-Gray</span>
                  </label>
                </div>
                <div className={`flex flex-col`}>
                  <span>Show Row:</span>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"hideRow"}
                      onChange={(e) => (props.store.hide = !Boolean(e.target.value))}
                      checked={!props.store.hide}
                    />
                    <span className={`ml-3`}>Show</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"hideRow"}
                      onChange={(e) => (props.store.hide = Boolean(e.target.value))}
                      checked={props.store.hide}
                    />
                    <span className={`ml-3`}>Hide</span>
                  </label>
                </div>
                <div className={`flex flex-col`}>
                  <span>Vertical Align:</span>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"start"}
                      value={"start"}
                      onChange={(e) => (props.store.vertical = e.target.value)}
                      checked={props.store.vertical === "start"}
                    />
                    <span className={`ml-3`}>Top</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"center"}
                      value={"center"}
                      onChange={(e) => (props.store.vertical = e.target.value)}
                      checked={props.store.vertical === "center"}
                    />
                    <span className={`ml-3`}>Center</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"end"}
                      value={"end"}
                      onChange={(e) => (props.store.vertical = e.target.value)}
                      checked={props.store.vertical === "end"}
                    />
                    <span className={`ml-3`}>Bottom</span>
                  </label>
                </div>
              </div>
              <div className={`flex flex-wrap items-${props.store.vertical || "start"}`}>
                {props.store.cells.map((cell, i) => (
                  <div
                    className={`inline-block flex-shrink-0 ${
                      grid["col-" + cell.size]
                    } border border-blue-400 box-border relative py-10`}
                    style={{ verticalAlign: "top" }}
                  >
                    <PageEditorCell key={i.toString()} store={cell} />
                  </div>
                ))}
                <div className="inline-block m-4 flex-shrink-0 self-end">
                  <AdminButton color={"primary"} onClick={() => props.store.addNewCell()}>
                    +
                  </AdminButton>
                </div>
              </div>
            </div>
            <td style={{ width: "0%", verticalAlign: "top" }}>
              <AdminButton color={"danger"} onClick={() => props.store.remove()}>
                X
              </AdminButton>
              {props.store.canMoveUp ? (
                <>
                  &nbsp;
                  <AdminButton color={"default"} onClick={() => s.moveUp()}>
                    ↑
                  </AdminButton>
                </>
              ) : null}
              {props.store.canMoveDown ? (
                <>
                  &nbsp;
                  <AdminButton color={"default"} onClick={() => s.moveDown()}>
                    ↓
                  </AdminButton>
                </>
              ) : null}
            </td>
          </div>
        </div>
      </div>
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
  const [showTypes, setShowTypes] = useState(false);
  const [currentType, setCurrentType] = useState(0);

  useEffect(() => {
    setCurrentType(AvailableBlocks.findIndex((el) => el.id === props.store.blockType));
  }, [props.store.blockType]);

  return useObserver(() => (
    <div>
      <div className={`flex`}>
        <div className={`mr-10`}>
          Size:
          <br />
          <AdminSlider min={1} max={12} value={props.store.size} onChange={(v) => (props.store.size = v)} />
        </div>
        <div className={`flex flex-col`}>
          <span>Show block:</span>
          <label className={`flex items-center mr-6`}>
            <input
              type={"radio"}
              name={"hideCell"}
              onChange={(e) => (props.store.hide = !Boolean(e.target.value))}
              checked={!props.store.hide}
            />
            <span className={`ml-3`}>Show</span>
          </label>
          <label className={`flex items-center mr-6`}>
            <input
              type={"radio"}
              name={"hideCell"}
              onChange={(e) => (props.store.hide = Boolean(e.target.value))}
              checked={props.store.hide}
            />
            <span className={`ml-3`}>Hide</span>
          </label>
        </div>
      </div>
      Type: {AvailableBlocks[currentType].name}
      <br />
      <AdminButton color={"primary"} onClick={() => setShowTypes(true)}>
        Change Type
      </AdminButton>
      {showTypes && (
        <AdminOverlayDialog cancel={() => setShowTypes(false)}>
          <div className={styles.types}>
            {AvailableBlocks.map((b, ind) => (
              <div
                key={ind}
                className={`${AvailableBlocks[ind].id === props.store.blockType ? styles.active : ""}`}
                onClick={() => {
                  props.store.blockType = AvailableBlocks[ind].id;
                  setShowTypes(false);
                }}
              >
                {b.preview ? <img src={b.preview} alt={b.preview} /> : <span>No preview</span>}
                <p>{b.name}</p>
              </div>
            ))}
          </div>
        </AdminOverlayDialog>
      )}
      {props.store.currentEditor == null ? null : (
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

const CreatePage = (props: {
  availableLangs: { lang: string; name: string }[];
  createPage: (copyFrom?: string) => void;
}) => {
  const noneLang = "<none>";
  const [selectedLang, setSelectedLang] = useState(noneLang);
  return (
    <div className="content-center m-4">
      {props.availableLangs.length == 0 ? null : (
        <>
          Copy from
          <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
            <option value={noneLang}>Create new</option>
            {props.availableLangs.map((l) => (
              <option value={l.lang}>{l.name}</option>
            ))}
          </select>
          <br />
        </>
      )}

      <AdminButton
        color="primary"
        onClick={(e) => props.createPage(selectedLang == noneLang ? undefined : selectedLang)}
      >
        Create Page Version
      </AdminButton>
    </div>
  );
};

export const PageEditor = (props: { store: PageEditorStore | any }) => {
  const s = props.store;
  return useObserver(() => {
    const availableLangs = dmap(AllLanguages, (id, lang) => ({
      lang: id,
      name: lang.title,
      isAvailable: props.store.langs[id] != null,
    })).filter((l) => l.isAvailable);
    return (
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
                    <CreatePage availableLangs={availableLangs} createPage={(copyFrom) => s.addLang(lang, copyFrom)} />
                  )
                : () => <PageLanguageEditor store={props.store.langs[lang]} />,
          }))}
        />
      </div>
    );
  });
};
