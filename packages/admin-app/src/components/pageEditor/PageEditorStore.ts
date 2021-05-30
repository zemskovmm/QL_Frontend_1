import { BlockUiDefinition } from "@project/components/src/blocks/blocks-info";
import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiDefinition,
  RemoteUiEditorConfiguration,
  RemoteUiEditorStore,
  RemoteUiTypeDefinition,
} from "@kekekeks/remoteui/src";
import { AdminRemoteUiHtmlEditorStore } from "src/components/remoteui/AdminRemoteUiHtmlEditor";
import { AdminRemoteUiImageFieldStore } from "src/components/remoteui/AdminRemoteUiImageEditor";
import { action, computed, observable, runInAction } from "mobx";
import { AvailableBlocks, findBlockInfo } from "@project/components/src/blocks";
import { AdminPageDto, AdminPageLanguageDto } from "src/interfaces/AdminPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { dictMap, fireAndAlertOnError } from "src/utils/util";
import { AdminApi } from "src/clients/adminApiClient";
import { PageBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import { AdminRemoteUiRowsStore } from "src/components/remoteui/AdminRemoteUiRowsEditor";
function createDefinition(definition: BlockUiDefinition): RemoteUiDefinition {
  const subTypes: { [key: string]: RemoteUiTypeDefinition } = {};
  if (definition.subTypes != null)
    for (const typeName in definition.subTypes) {
      if (definition.subTypes.hasOwnProperty(typeName)) {
        subTypes[typeName] = {
          groups: [
            {
              name: "",
              fields: definition.subTypes[typeName].fields,
            },
          ],
        };
      }
    }

  return {
    groups: [
      {
        name: "",
        fields: definition.fields,
      },
    ],
    types: subTypes,
  };
}

class RemoteUiCustomization implements IRemoteUiEditorStoreCustomization {
  getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
    if (type == "Html") return new AdminRemoteUiHtmlEditorStore(data);
    if (type == "Image") return new AdminRemoteUiImageFieldStore(data);
    if (type == "Rows") return new AdminRemoteUiRowsStore(data);
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
    if (this.blocks[this.blockType] != null) return this.blocks[this.blockType];
    const info = findBlockInfo(this.blockType);
    if (info != null)
      return (this.blocks[this.blockType] = new RemoteUiEditorStore(
        createDefinition(info.definition),
        JSON.parse(JSON.stringify(this.blockDatas[this.blockType] || info.initialData)),
        new RemoteUiCustomization()
      ));

    return null;
  }

  @computed get saveEnabled() {
    return this.currentEditor != null && this.currentEditor.rootObject.isValid;
  }

  public async save() {
    if (this.currentEditor == null) return;
    const data = await this.currentEditor.getDataAsync();
    runInAction(() => {
      this.cell.blockType = this.blockType;
      this.cell.blockData = data;
      this.cell.size = this.size;
      this.dismiss();
    });
  }
}

export class PageEditorCellStore {
  @observable blockType: string = "";
  @observable blockData: any = null;
  @observable size: number;

  constructor(
    private editor: PageRowsEditorStore,
    private row: PageEditorRowStore,
    size: number,
    blockType: string,
    blockData: any
  ) {
    this.size = size;
    const info = findBlockInfo(blockType);
    if (info != null) {
      this.blockData = blockData;
      this.blockType = blockType;
    }
  }

  @action triggerEdit() {
    this.editor.cellEditor = new PageEditorCellDialogStore(this, () => (this.editor.cellEditor = null));
  }

  triggerDelete() {
    if (!confirm("Are you sure?")) return;
    this.row.cells = this.row.cells.filter((x) => x != this);
  }
}

function editNewCell(editor: PageRowsEditorStore, row: PageEditorRowStore, cb: (cell: PageEditorCellStore) => void) {
  const cell = new PageEditorCellStore(
    editor,
    row,
    12,
    AvailableBlocks[0].id,
    JSON.parse(JSON.stringify(AvailableBlocks[0].initialData))
  );
  editor.cellEditor = new PageEditorCellDialogStore(cell, () => {
    cb(cell);
    editor.cellEditor = null;
  });
}

export class PageEditorRowStore {
  @observable cells: PageEditorCellStore[] = [];
  @observable maxWidth?: string;
  @observable backGround?: string;

  constructor(private editor: PageRowsEditorStore) {}

  @action addNewCell() {
    editNewCell(this.editor, this, (cell) => {
      this.cells.push(cell);
    });
  }

  @action addCellWithData(type: string, data: any, size: number) {
    this.cells.push(new PageEditorCellStore(this.editor, this, size, type, data));
  }

  remove() {
    if (!confirm("Are you sure?")) return;
    this.editor.rows = this.editor.rows.filter((x) => x != this);
  }

  @computed get canMoveUp(): boolean {
    return this.editor.rows.indexOf(this) > 0;
  }

  @computed get canMoveDown(): boolean {
    const ind = this.editor.rows.indexOf(this);
    return ind >= 0 && ind < this.editor.rows.length - 1;
  }

  moveTo(newIndex: number) {
    const ind = this.editor.rows.indexOf(this);
    const swapWith = this.editor.rows[newIndex];
    this.editor.rows[ind] = swapWith;
    this.editor.rows[newIndex] = this;
  }

  @action moveUp() {
    this.moveTo(this.editor.rows.indexOf(this) - 1);
  }

  @action moveDown() {
    this.moveTo(this.editor.rows.indexOf(this) + 1);
  }

  serialize(): PageBlockRowDto {
    return {
      maxWidth: this.maxWidth,
      background: this.backGround,
      blocks: this.cells.map((c) => ({ type: c.blockType, data: c.blockData, size: c.size })),
    };
  }
}

export class PageRowsEditorStore {
  constructor(rows: PageBlockRowDto[]) {
    this.rows = rows.map((row) => {
      const editor = new PageEditorRowStore(this);
      editor.maxWidth = row.maxWidth;
      editor.backGround = row.background;
      for (const cell of row.blocks) editor.addCellWithData(cell.type, cell.data, cell.size);
      return editor;
    });
  }

  @observable rows: PageEditorRowStore[] = [];
  @observable cellEditor: PageEditorCellDialogStore | null = null;

  @action addRow() {
    const row = new PageEditorRowStore(this);
    editNewCell(this, row, (cell) => {
      row.cells.push(cell);
      this.rows.push(row);
    });
  }
}

export class PageLanguageEditorStore extends PageRowsEditorStore {
  @observable title: string;
  @observable url: string;
  constructor(data: AdminPageLanguageDto) {
    super(data.pageData.rows);
    this.title = data.title;
    this.url = data.url;
  }

  serialize(): AdminPageLanguageDto {
    return {
      title: this.title,
      url: this.url,
      pageData: {
        rows: this.rows.map((r) => r.serialize()),
      },
    };
  }
}

export class PageEditorStore extends RequestTracking {
  @observable langs: { [lang: string]: PageLanguageEditorStore } = {};
  @observable id: number | null = null;

  constructor(private onSave: (id: number) => void, id: number | null, data: AdminPageDto | null) {
    super();
    if (id) {
      if (!data) throw new Error("id is set but data is missing");
      this.id = id;
      for (const l in data.languages) {
        this.langs[l] = new PageLanguageEditorStore(data.languages[l]);
      }
    } else {
      this.addLang("en");
    }
  }

  @action addLang(lang: string, copyFrom?: string) {
    const initialData = {
      url: "url",
      title: "Title",
      pageData: {
        rows: [
          {
            maxWidth: "",
            background: "",
            blocks: [
              {
                size: 12,
                type: AvailableBlocks[0].id,
                data: JSON.parse(JSON.stringify(AvailableBlocks[0].initialData)),
              },
            ],
          },
        ],
      },
    };
    this.langs[lang] = new PageLanguageEditorStore(
      copyFrom != null && this.langs[copyFrom] != null ? this.langs[copyFrom].serialize() : initialData
    );
  }

  serialize(): AdminPageDto {
    return {
      languages: dictMap(this.langs, (k, v) => v.serialize()),
    };
  }

  async save() {
    if (this.isLoading) return;
    const dto = this.serialize();
    fireAndAlertOnError(() =>
      this.track(async () => {
        if (this.id === null) this.id = (await AdminApi.createPage(dto)).id;
        else await AdminApi.updatePage(this.id, dto);
        this.onSave(this.id);
      })
    );
  }
}
