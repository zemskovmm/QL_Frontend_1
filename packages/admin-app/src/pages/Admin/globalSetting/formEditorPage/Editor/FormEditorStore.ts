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
import { findBlockInfo } from "@project/components/src/blocks";
import { AdminFormPageLanguageDto } from "src/interfaces/AdminFormPageDto";
import { RequestTracking } from "src/utils/Loadable";
import { fireAndAlertOnError } from "src/utils/util";
import { AdminApi } from "src/clients/adminApiClient";
import { FormBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import { AdminRemoteUiRowsStore } from "src/components/remoteui/AdminRemoteUiRowsEditor";
import { EditFormDto, FormSchemaFieldDto, GlobalSettingsDto } from "src/interfaces/GlobalSettingsDto";
import { FormBuilderBlockList } from "@project/components/src/FormBuilderBlocks/FormBuilderBlockList";
import { AdminRemoteUiDropdownSchemaEditorStore } from "src/components/remoteui/AdminRemoteUiDropdownSchemaEditor";
import { findIndex } from "lodash";

export function createDefinition(definition: BlockUiDefinition): RemoteUiDefinition {
  const subTypes: { [key: string]: RemoteUiTypeDefinition } = {};
  if (definition.subTypes != null)
    for (const typeName in definition.subTypes) {
      if (definition.subTypes.hasOwnProperty(typeName)) {
        subTypes[typeName] = {
          groups: [
            {
              name: "",
              fields: definition.subTypes[typeName].fields as any,
            },
          ],
        };
      }
    }

  return {
    groups: [
      {
        name: "",
        fields: definition.fields as any,
      },
    ],
    types: subTypes,
  };
}

export class RemoteUiCustomization implements IRemoteUiEditorStoreCustomization {
  getCustomStore(config: RemoteUiEditorConfiguration, type: string, data: any): IRemoteUiData {
    if (type == "Html") return new AdminRemoteUiHtmlEditorStore(data);
    if (type == "Image") return new AdminRemoteUiImageFieldStore(data);
    if (type == "Rows") return new AdminRemoteUiRowsStore(data);
    if (type == "DropdownSchema") return new AdminRemoteUiDropdownSchemaEditorStore(data);
    return null!;
  }
}

export class FormEditorCellDialogStore {
  @observable.ref blocks: { [name: string]: any } = {};
  @observable.ref blockDatas: { [name: string]: any } = {};
  @observable blockType: string = "";
  @observable size: number;
  @observable hide: boolean;

  constructor(private cell: FormEditorCellStore, private dismiss: () => void) {
    this.blockType = cell.blockType;
    this.blockDatas[cell.blockType] = cell.blockData;
    this.size = cell.size;
    this.hide = cell.hide;
  }

  @computed get currentEditor(): RemoteUiEditorStore | null {
    if (this.blocks[this.blockType] != null) return this.blocks[this.blockType];
    const info = findBlockInfo(this.blockType, true);
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
      this.cell.hide = this.hide;
      this.cell.size = this.size;
      this.dismiss();
    });
  }
}

export class FormEditorCellStore {
  @observable blockType: string = "";
  @observable blockData: any = null;
  @observable size: number;
  @observable hide: boolean;

  constructor(
    private editor: FormRowsEditorStore,
    private row: FormEditorRowStore,
    size: number,
    hide: boolean,
    blockType: string,
    blockData: any
  ) {
    this.size = size;
    this.hide = hide;
    const info = findBlockInfo(blockType, true);
    if (info != null) {
      this.blockData = blockData;
      this.blockType = blockType;
    }
  }

  @action triggerEdit() {
    this.editor.cellEditor = new FormEditorCellDialogStore(this, () => (this.editor.cellEditor = null));
  }

  triggerDelete() {
    if (!confirm("Are you sure?")) return;
    this.row.cells = this.row.cells.filter((x) => x != this);
  }
}

function editNewCell(editor: FormRowsEditorStore, row: FormEditorRowStore, cb: (cell: FormEditorCellStore) => void) {
  const cell = new FormEditorCellStore(
    editor,
    row,
    12,
    false,
    FormBuilderBlockList[0].id,
    JSON.parse(JSON.stringify(FormBuilderBlockList[0].initialData))
  );
  editor.cellEditor = new FormEditorCellDialogStore(cell, () => {
    cb(cell);
    editor.cellEditor = null;
  });
}

export class FormEditorRowStore {
  @observable cells: FormEditorCellStore[] = [];
  @observable maxWidth: string = "100%";
  @observable backGround: string = "#fff";
  @observable hide: boolean = false;
  @observable vertical: string = "start";

  constructor(private editor: FormRowsEditorStore) {}

  @action addNewCell() {
    editNewCell(this.editor, this, (cell) => {
      this.cells.push(cell);
    });
  }

  @action addCellWithData(type: string, data: any, size: number, hide: boolean) {
    this.cells.push(new FormEditorCellStore(this.editor, this, size, hide, type, data));
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
    this.editor.rows[ind] = this.editor.rows[newIndex];
    this.editor.rows[newIndex] = this;
  }

  @action moveUp() {
    this.moveTo(this.editor.rows.indexOf(this) - 1);
  }

  @action moveDown() {
    this.moveTo(this.editor.rows.indexOf(this) + 1);
  }

  serialize(): FormBlockRowDto {
    return {
      maxWidth: this.maxWidth,
      background: this.backGround,
      hide: this.hide,
      vertical: this.vertical,
      blocks: this.cells.map((c) => ({ type: c.blockType, data: c.blockData, size: c.size, hide: c.hide })),
    };
  }
}

export class FormRowsEditorStore {
  constructor(rows: FormBlockRowDto[]) {
    this.rows = rows.map((row) => {
      const editor = new FormEditorRowStore(this);
      editor.maxWidth = row.maxWidth;
      editor.backGround = row.background;
      editor.hide = row.hide;
      editor.vertical = row.vertical;
      for (const cell of row.blocks) editor.addCellWithData(cell.type, cell.data, cell.size, cell.hide);
      return editor;
    });
  }

  @observable rows: FormEditorRowStore[] = [];
  @observable cellEditor: FormEditorCellDialogStore | null = null;

  @action addRow() {
    const row = new FormEditorRowStore(this);
    editNewCell(this, row, (cell) => {
      row.cells.push(cell);
      this.rows.push(row);
    });
  }
}

export class FormLanguageEditorStore extends FormRowsEditorStore {
  constructor(data: AdminFormPageLanguageDto) {
    super(data.pageData.rows);
  }

  serialize(): AdminFormPageLanguageDto {
    return {
      pageData: {
        rows: this.rows.map((r) => r.serialize()),
      },
    };
  }
}

const initialData = {
  pageData: {
    rows: [
      {
        maxWidth: "",
        background: "",
        hide: false,
        vertical: "start",
        blocks: [
          {
            size: 12,
            hide: false,
            type: FormBuilderBlockList[0].id,
            data: JSON.parse(JSON.stringify(FormBuilderBlockList[0].initialData)),
          },
        ],
      },
    ],
  },
};

export class FormEditorStore extends RequestTracking {
  @observable langs: FormLanguageEditorStore;
  @observable schemaEditor: SchemeEditorStore | null = null;

  constructor(
    private onSave: () => void,
    private type: string,
    private data: EditFormDto | null,
    private lang: string,
    private req: GlobalSettingsDto
  ) {
    super();
    if (data) {
      this.langs = new FormLanguageEditorStore(data.form);
    } else {
      this.langs = new FormLanguageEditorStore(initialData);
    }
    this.schemaEditor = new SchemeEditorStore(data?.schema ?? null);
  }

  async save() {
    if (this.isLoading) return;
    const dto = this.langs.serialize();
    const schema: FormSchemaFieldDto[] = this.schemaEditor?.serialize() ?? [];
    const personalCabinet = this.req.personalCabinet ?? {};
    personalCabinet[this.type] = {
      schema: schema,
      form: dto,
    };
    fireAndAlertOnError(() =>
      this.track(async () => {
        if (schema === undefined) {
          return alert("make schema plz");
        }
        const body: GlobalSettingsDto = {
          requestForm: this.req.requestForm,
          header: this.req.header,
          footer: this.req.footer,
          personalCabinet: personalCabinet,
        };
        try {
          await AdminApi.putGlobalSettings(this.lang, body);
          alert("Settings saved");
        } catch (e) {
          alert(e);
        }
      })
    );
  }
}

const definitionSchema = {
  fields: [
    {
      id: "id",
      type: "String",
      name: "id",
    },
    {
      id: "displayName",
      type: "String",
      name: "displayName",
    },
    {
      id: "type",
      type: "Select",
      name: "type",
      possibleValues: [
        {
          id: "text",
          name: "Text",
        },
        {
          id: "file",
          name: "File",
        },
        { id: "fileList", name: "File list" },
      ],
    },
    {
      id: "required",
      type: "CheckBox",
      name: "required",
    },
    {
      id: "hide",
      type: "CheckBox",
      name: "hide",
    },
  ],
};

const definitionSchemaEdit = {
  fields: [
    {
      id: "required",
      type: "CheckBox",
      name: "required",
    },
    {
      id: "hide",
      type: "CheckBox",
      name: "hide",
    },
  ],
};

class SchemeEditorStore {
  @observable blockData: FormSchemaFieldDto[];
  @observable editSchemaShow: boolean = false;
  @observable blockEdit: FormSchemaFieldDto | null = null;
  @observable arrayIndex?: number;

  constructor(private props: FormSchemaFieldDto[] | null) {
    this.blockData = props ?? [];
  }

  @computed get currentSchemeEditor(): RemoteUiEditorStore | null {
    if (this.blockEdit) {
      return new RemoteUiEditorStore(
        createDefinition(definitionSchemaEdit),
        this.blockEdit,
        new RemoteUiCustomization()
      );
    } else {
      return new RemoteUiEditorStore(createDefinition(definitionSchema), this.blockEdit, new RemoteUiCustomization());
    }
  }

  dismiss() {
    this.editSchemaShow = false;
    this.blockEdit = null;
    this.arrayIndex = undefined;
  }

  @action open(el: any, index: number) {
    this.editSchemaShow = true;
    this.blockEdit = el;
    this.arrayIndex = index;
  }

  @action addNew() {
    this.blockEdit = null;
    this.editSchemaShow = true;
  }

  public async save() {
    if (this.currentSchemeEditor == null) return;
    const data: any = await this.currentSchemeEditor.getDataAsync();
    if (this.arrayIndex === undefined && (!data.id || !data.displayName)) {
      alert(`${data.id ? "" : "Fill in the field id"} ${data.displayName ? "" : "Fill in the field displayName"}`);
      return;
    }
    if (findIndex(this.blockData, ["id", data.id]) >= 0) {
      alert(`this id is already taken`);
      return;
    }
    runInAction(() => {
      if (this.arrayIndex !== undefined) {
        this.blockData[this.arrayIndex].required = data.required;
        this.blockData[this.arrayIndex].hide = data.hide;
      } else {
        this.blockData.push(data);
      }
      this.dismiss();
    });
  }

  serialize(): FormSchemaFieldDto[] {
    return this.blockData;
  }
}
