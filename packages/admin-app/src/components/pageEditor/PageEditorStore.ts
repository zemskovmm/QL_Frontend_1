import {BlockUiDefinition} from "@project/components/src/blocks/blocks-info";
import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiDefinition,
  RemoteUiEditorConfiguration, RemoteUiEditorStore,
  RemoteUiTypeDefinition
} from "@kekekeks/remoteui/src";
import {AdminRemoteUiHtmlEditorStore} from "src/components/remoteui/AdminRemoteUiHtmlEditor";
import {action, computed, observable, runInAction} from "mobx";
import {AvailableBlocks, findBlockInfo} from "@project/components/src/blocks";
import {AdminPageDto, AdminPageLanguageDto} from "src/interfaces/PageDto";
import {RequestTracking} from "../../utils/Loadable";
import {dictMap} from "../../utils/util";
import {AdminApi} from "../../clients/adminApiClient";

function createDefinition(definition: BlockUiDefinition): RemoteUiDefinition {
    const subTypes: { [key: string]: RemoteUiTypeDefinition } = {};
    if (definition.subTypes != null)
        for (const typeName in definition.subTypes) {
            if (definition.subTypes.hasOwnProperty(typeName)) {
                subTypes[typeName] = {
                    groups: [{
                        name: "",
                        fields: definition.subTypes[typeName].fields
                    }]
                }
            }
        }

    return {
        groups: [{
            name: "",
            fields: definition.fields
        }],
        types: subTypes
    }
}

class RemoteUiCustomization implements IRemoteUiEditorStoreCustomization {
    getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
        if (type == "Html")
            return new AdminRemoteUiHtmlEditorStore(data);
        return null!;
    }
}

export class PageEditorCellDialogStore {
    @observable.ref blocks: { [name: string]: any } = {};
    @observable.ref blockDatas: { [name: string]: any } = {};
    @observable blockType: string = "";
    @observable size: number;

    constructor(private cell: PageEditorCellStore, private dismiss: () => void) {
        this.blockType = cell.blockType;
        this.blockDatas[cell.blockType] = cell.blockData;
        this.size = cell.size;
    }

    @computed get currentEditor(): RemoteUiEditorStore | null {
        if (this.blocks[this.blockType] != null)
            return this.blocks[this.blockType];
        const info = findBlockInfo(this.blockType);
        if (info != null)
            return this.blocks[this.blockType] = new RemoteUiEditorStore(
                createDefinition(info.definition), JSON.parse(JSON.stringify(this.blockDatas[this.blockType] || info.initialData)),
                new RemoteUiCustomization());

        return null;
    }

    @computed get saveEnabled() {
        return this.currentEditor != null && this.currentEditor.rootObject.isValid;
    }

    public async save() {
        if (this.currentEditor == null)
            return;
        const data = await this.currentEditor.getDataAsync();
        runInAction(() => {
            this.cell.blockType = this.blockType;
            this.cell.blockData = data;
            this.cell.size = this.size;
            this.dismiss();
        })
    }
}

export class PageEditorCellStore {
    @observable blockType: string = "";
    @observable blockData: any = null;
    @observable size: number;

    constructor(
        private editor: PageLanguageEditorStore,
        private row: PageEditorRowStore,
        size: number, blockType: string, blockData: any) {
        this.size = size;
        const info = findBlockInfo(blockType);
        if (info != null) {
            this.blockData = blockData;
            this.blockType = blockType;
        }
    }

    @action triggerEdit() {
        this.editor.cellEditor = new PageEditorCellDialogStore(this, () => this.editor.cellEditor = null);
    }

    triggerDelete() {
        this.row.cells = this.row.cells.filter(x => x != this);
    }
}

export class PageEditorRowStore {
    @observable cells: PageEditorCellStore[] = [];

    constructor(private editor: PageLanguageEditorStore) {

    }

    @action addNewCell() {
        const cell = new PageEditorCellStore(this.editor, this, 12, AvailableBlocks[0].id,
            JSON.parse(JSON.stringify(AvailableBlocks[0].initialData)));
        this.editor.cellEditor = new PageEditorCellDialogStore(cell, () => {
            this.cells.push(cell);
            this.editor.cellEditor = null;
        });
    }

    @action addCellWithData(type: string, data: any, size: number) {
        this.cells.push(new PageEditorCellStore(this.editor, this, size, type, data));
    }
}

export class PageLanguageEditorStore {
    constructor(data: AdminPageLanguageDto) {
        this.title = data.title;
        this.url = data.url;
        this.rows = data.pageData.rows.map(row => {

            const editor = new PageEditorRowStore(this);
            for (const cell of row.blocks)
                editor.addCellWithData(cell.type, cell.data, cell.size);
            return editor;
        });
    }

    @observable rows: PageEditorRowStore[] = [];
    @observable cellEditor: PageEditorCellDialogStore | null = null;
    @observable title: string;
    @observable url: string;

    @action addRow() {
        this.rows.push(new PageEditorRowStore(this));
    }

    serialize(): AdminPageLanguageDto {
        return {
            title: this.title,
            url: this.url,
            pageData: {
                rows: this.rows.map(r => ({
                    blocks: r.cells.map(c => ({type: c.blockType, data: c.blockData, size: c.size}))
                }))
            }
        }
    }
}

export class PageEditorStore extends RequestTracking {
    @observable langs: { [lang: string]: PageLanguageEditorStore } = {};
    @observable id: number | null = null;

    constructor(id: number | null, data: AdminPageDto | null) {
        super();
        if (id) {
            if (!data)
                throw new Error("id is set but data is missing");
            this.id = id;
            for (const l in data.languages) {
                this.langs[l] = new PageLanguageEditorStore(data.languages[l]);
            }
        } else {
            this.addLang("en");
        }
    }

    @action addLang(lang: string) {
        this.langs[lang] = new PageLanguageEditorStore({
            url: "url",
            title: "Title",
            pageData: {
                rows: [{
                    blocks: [{
                        size: 12,
                        type: AvailableBlocks[0].id,
                        data: JSON.parse(JSON.stringify(AvailableBlocks[0].initialData))
                    }]
                }]
            }
        })
    }

    serialize(): AdminPageDto {
        return {
            languages: dictMap(this.langs,
                (k, v) => v.serialize())
        };
    }

    async save() {
        if (this.isLoading)
            return;
        const dto = this.serialize()
        await this.track(async () => {
            if (this.id == null)
                this.id = (await AdminApi.createPage(dto)).id;
            else await AdminApi.updatePage(this.id, dto);
        });
    }

}

