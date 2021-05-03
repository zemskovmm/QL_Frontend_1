import {
    PageEditorCellDialogStore,
    PageEditorCellStore,
    PageEditorRowStore,
    PageEditorStore, PageLanguageEditorStore
} from "./PageEditorStore";
import {useObserver} from "mobx-react";
import {AdminRemoteUiHtmlEditor, AdminRemoteUiHtmlEditorStore} from "../remoteui/AdminRemoteUiHtmlEditor";
import {AvailableBlocks, BlockPresenter} from "@project/components/src/blocks";
import {AdminButton} from "../common/AdminButton";
import {IRemoteUiData, IRemoteUiEditorCustomization, RemoteUiEditor} from "@kekekeks/remoteui/src";
import {AdminSlider} from "../common/AdminSlider";
import {AdminOverlayDialog} from "../common/AdminOverlayDialog";
import {bind, dmap} from "../../utils/util";
import {AdminTabControl} from "../common/AdminTabControl";
import {AllLanguages} from "../../utils/langs";
import "@kekekeks/remoteui/src/RemoteUiEditor.css"

const PageEditorCell = (props: { store: PageEditorCellStore }) => {
    const s = props.store;
    return useObserver(() => <div
        className={"bg-gray-500 pl-4 pr-4 col-span-" + s.size}>
        <div className="bg-white">
            <div className="relative">
                <div>
                    {s.blockData == null
                        ? null
                        : <BlockPresenter blockType={s.blockType} blockData={s.blockData}/>}
                </div>
                <div className="absolute top-0 right-0">
                    <AdminButton color={"primary"} onClick={() => s.triggerEdit()}>Edit</AdminButton>
                    &nbsp;
                    <AdminButton color={"danger"} onClick={() => s.triggerDelete()}>Delete</AdminButton>
                </div>
            </div>
        </div>
    </div>);
}

const PageEditorRow = (props: { store: PageEditorRowStore }) => {
    return useObserver(() => <div className="bg-gray-500 pt-8 pb-8 row">
        <div className="grid grid-rows-13 grid-rows-1 grid-flow-col gap-4">
            {props.store.cells.map(cell => <PageEditorCell store={cell}/>)}
            <div className="pl-30 pr-30 col-span-1">
                <AdminButton color={"primary"} onClick={() => props.store.addNewCell()}>+</AdminButton>
            </div>
        </div>
    </div>);
}

class RemoteUiCustomization implements IRemoteUiEditorCustomization {
    getEditorFor(store: IRemoteUiData): any {
        if (store instanceof AdminRemoteUiHtmlEditorStore)
            return <AdminRemoteUiHtmlEditor store={store}/>
        return null;
    }

}

const PageEditorCellDialog = (props: { store: PageEditorCellDialogStore }) => {
    return useObserver(() => <div>
        Size:
        <br/>
        <AdminSlider
            min={0}
            max={12}
            value={props.store.size}
            onChange={v => props.store.size = v}
        />
        <br/>
        Type:
        <select
            value={props.store.blockType}
            onChange={e => props.store.blockType = e.currentTarget.value}>
            <option value="">Select...</option>
            {
                AvailableBlocks.map(b => <option value={b.id}>{b.name}</option>)
            }
        </select>
        {props.store.currentEditor == null
            ? null
            : <div>
                <div style={{margin: '5px', width: 600, maxWidth: '90vh', maxHeight: "70vh", overflow: 'scroll'}}>
                    <RemoteUiEditor store={props.store.currentEditor} customization={new RemoteUiCustomization()}/>
                </div>
                <br/>
                <AdminButton color={"primary"} onClick={() => props.store.save()}>Save</AdminButton>
            </div>}

    </div>);
}

export const PageLanguageEditor = (props: { store: PageLanguageEditorStore }) => {
    const s = props.store;

    return useObserver(() => <div>
        {s.cellEditor == null
            ? null
            : <AdminOverlayDialog cancel={() => s.cellEditor = null}>
                <PageEditorCellDialog store={s.cellEditor}/>
            </AdminOverlayDialog>
        }
        <label><b>Title</b></label>
        <br/>
        <input {...bind(s, "title")} />
        <br/>
        <label><b>Url</b></label>
        <br/>
        <input {...bind(s, "url")} />
        <br/>
        {s.rows.map(r => <PageEditorRow store={r}/>)}
        <div className="content-center mt-8">
            <AdminButton
                color="primary"
                onClick={() => s.addRow()}
            >Add row</AdminButton>
        </div>
    </div>);
}


export const PageEditor = (props: { store: PageEditorStore }) => {
    const s = props.store;
    return useObserver(() => <AdminTabControl tabs={dmap(AllLanguages, (lang, data) => ({
        id: lang,
        title: data.title,
        renderer: props.store.langs[lang] == null ?
            () => <div className="content-center m-4">
                <AdminButton color="primary" onClick={e => s.addLang(lang)}>Create Page Version</AdminButton>
            </div>
            : () => <PageLanguageEditor store={props.store.langs[lang]}/>
    }))}/>)
}
