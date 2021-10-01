import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "src/stores/RootStore";
import {
  GlobalSettingsDto,
  LinkDto,
  SocialLinkDto,
  LinkListDto,
  ContactLinkDto,
} from "src/interfaces/GlobalSettingsDto";
import {
  IRemoteUiData,
  IRemoteUiEditorStoreCustomization,
  RemoteUiDefinition,
  RemoteUiEditorConfiguration,
  RemoteUiEditorStore,
  RemoteUiTypeDefinition,
} from "@kekekeks/remoteui/src";
import { AvailableBlocks, findBlockInfo } from "@project/components/src/blocks";
import { BlockUiDefinition } from "@project/components/src/blocks/blocks-info";
import { AdminRemoteUiHtmlEditorStore } from "../../../components/remoteui/AdminRemoteUiHtmlEditor";
import { AdminRemoteUiImageFieldStore } from "../../../components/remoteui/AdminRemoteUiImageEditor";
import { AdminRemoteUiRowsStore } from "../../../components/remoteui/AdminRemoteUiRowsEditor";
import { PageBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import { AdminPageDto, AdminPageLanguageDto, AdminPageMetaDto } from "../../../interfaces/AdminPageDto";
import { AdminRemoteUiDropdownEditorStore } from "../../../components/remoteui/AdminRemoteUiDropdownEditor";
import { dictMap, fireAndAlertOnError } from "../../../utils/util";

export class GlobalSettingsPageStore extends RequestTracking {
  @observable headerTopLink: LinkDto[] = [];
  @observable headerSocialLink: SocialLinkDto[] = [];
  @observable headerBottomLink: LinkDto[] = [];

  @observable footerTopLink: LinkDto[] = [];
  @observable footerLinkList: LinkListDto[] = [];
  @observable footerContactLinkList: ContactLinkDto[] = [];
  @observable footerSocialLink: SocialLinkDto[] = [];

  @observable requestFormTitle: string = "";
  @observable requestFormLeftTitle: string = "";
  @observable requestFormRightTitle: string = "";
  @observable requestFormPostText: string = "";

  @observable alert: boolean = false;
  @observable buttonDisabled: boolean = false;
  @observable lang: string = "";
  @observable langs: { [lang: string]: PageLanguageEditorStore } = {};
  @observable id: number | null = null;
  @observable pageType?: AdminRemoteUiDropdownEditorStore;

  // constructor(public rootStore: RootStore) {
  //   super();
  // }

  constructor(private onSave: (id: number) => void, id: number | null, data: AdminPageDto | null) {
    super();
    this.pageType = new AdminRemoteUiDropdownEditorStore(`${data?.pageType ?? "Page"}`, PageItems);
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
      metadata: null,
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
    const pageType = this.pageType?.getData() ?? "Page";
    const pageTypeModel = PageItems.find((x) => x.name == pageType);
    return {
      languages: dictMap(this.langs, (k, v) => v.serialize()),
      pageType: Number(pageTypeModel?.id ?? 0),
    };
  }

  @action resetState() {
    this.headerTopLink = [];
    this.headerSocialLink = [];
    this.headerBottomLink = [];
    this.footerTopLink = [];
    this.footerLinkList = [];
    this.footerContactLinkList = [];
    this.footerSocialLink = [];
    this.requestFormTitle = "";
    this.requestFormLeftTitle = "";
    this.requestFormRightTitle = "";
    this.requestFormPostText = "";
  }

  @action async load(lang: string) {
    this.resetState();
    this.lang = lang;
    try {
      const req: GlobalSettingsDto = await this.track(() => AdminApi.getGlobalSettings(lang));
      this.headerTopLink = req.header.headerTopLink ?? [];
      this.headerSocialLink = req.header.headerSocialLink ?? [];
      this.headerBottomLink = req.header.headerBottomLink ?? [];
      this.footerTopLink = req.footer.footerTopLink ?? [];
      this.footerLinkList = req.footer.footerLinkList ?? [];
      this.footerContactLinkList = req.footer.footerContactLinkList ?? [];
      this.footerSocialLink = req.footer.footerSocialLink ?? [];
      this.requestFormTitle = req.requestForm.requestFormTitle;
      this.requestFormLeftTitle = req.requestForm.requestFormLeftTitle;
      this.requestFormRightTitle = req.requestForm.requestFormRightTitle;
      this.requestFormPostText = req.requestForm.requestFormPostText;
    } catch (e) {}
  }

  async save() {
    this.buttonDisabled = true;
    const data: GlobalSettingsDto = {
      header: {
        headerTopLink: this.headerTopLink,
        headerSocialLink: this.headerSocialLink,
        headerBottomLink: this.headerBottomLink,
      },
      requestForm: {
        requestFormLeftTitle: this.requestFormLeftTitle,
        requestFormRightTitle: this.requestFormRightTitle,
        requestFormTitle: this.requestFormTitle,
        requestFormPostText: this.requestFormPostText,
      },
      footer: {
        footerTopLink: this.footerTopLink,
        footerLinkList: this.footerLinkList,
        footerContactLinkList: this.footerContactLinkList,
        footerSocialLink: this.footerSocialLink,
      },
    };
    try {
      await this.track(() => AdminApi.putGlobalSettings(this.lang, data));
      this.alert = true;
      alert("saved");
    } catch (e) {
      alert(e);
    }

    this.buttonDisabled = false;
  }

  // async save() {
  //   if (this.isLoading) return;
  //   const dto = this.serialize();
  //   fireAndAlertOnError(() =>
  //     this.track(async () => {
  //       if (this.id === null) this.id = (await AdminApi.createPage(dto)).id;
  //       else await AdminApi.updatePage(this.id, dto);
  //       this.onSave(this.id);
  //     })
  //   );
  // }
}

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
    return null!;
  }
}

export class PageEditorCellDialogStore {
  @observable.ref blocks: { [name: string]: any } = {};
  @observable.ref blockDatas: { [name: string]: any } = {};
  @observable blockType: string = "";
  @observable size: number;
  @observable hide: boolean;

  constructor(private cell: PageEditorCellStore, private dismiss: () => void) {
    this.blockType = cell.blockType;
    this.blockDatas[cell.blockType] = cell.blockData;
    this.size = cell.size;
    this.hide = cell.hide;
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
      this.cell.hide = this.hide;
      this.cell.size = this.size;
      this.dismiss();
    });
  }
}

export class PageEditorCellStore {
  @observable blockType: string = "";
  @observable blockData: any = null;
  @observable size: number;
  @observable hide: boolean;

  constructor(
    private editor: PageRowsEditorStore,
    private row: PageEditorRowStore,
    size: number,
    hide: boolean,
    blockType: string,
    blockData: any
  ) {
    this.size = size;
    this.hide = hide;
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
    false,
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
  @observable maxWidth: string = "100%";
  @observable backGround: string = "#fff";
  @observable hide: boolean = false;
  @observable vertical: string = "start";

  constructor(private editor: PageRowsEditorStore) {}

  @action addNewCell() {
    editNewCell(this.editor, this, (cell) => {
      this.cells.push(cell);
    });
  }

  @action addCellWithData(type: string, data: any, size: number, hide: boolean) {
    this.cells.push(new PageEditorCellStore(this.editor, this, size, hide, type, data));
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
      hide: this.hide,
      vertical: this.vertical,
      blocks: this.cells.map((c) => ({ type: c.blockType, data: c.blockData, size: c.size, hide: c.hide })),
    };
  }
}

export class PageRowsEditorStore {
  constructor(rows: PageBlockRowDto[]) {
    this.rows = rows.map((row) => {
      const editor = new PageEditorRowStore(this);
      editor.maxWidth = row.maxWidth;
      editor.backGround = row.background;
      editor.hide = row.hide;
      editor.vertical = row.vertical;
      for (const cell of row.blocks) editor.addCellWithData(cell.type, cell.data, cell.size, cell.hide);
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
  @observable previewImage: AdminRemoteUiImageFieldStore;
  @observable smallPreviewImage: AdminRemoteUiImageFieldStore;
  @observable widePreviewImage: AdminRemoteUiImageFieldStore;
  @observable metadata?: AdminPageMetaDto | null;

  constructor(data: AdminPageLanguageDto) {
    super(data.pageData.rows);
    this.title = data.title;
    this.url = data.url;
    this.metadata = data.metadata;
    this.previewImage = new AdminRemoteUiImageFieldStore(data.previewImageId ?? null);
    this.smallPreviewImage = new AdminRemoteUiImageFieldStore(data.smallPreviewImageId ?? null);
    this.widePreviewImage = new AdminRemoteUiImageFieldStore(data.widePreviewImageId ?? null);
  }

  @action addMeta() {
    if (this.metadata === null) {
      this.metadata = { meta: [] };
    }
    if (this.metadata?.meta === null) {
      this.metadata.meta = [];
    }
    const data = { name: "", property: "", content: "" };
    this.metadata?.meta.push(data);
    console.log(this.metadata?.meta);
  }

  @action removeMeta(index: number) {
    this.metadata?.meta.splice(index, 1);
  }

  serialize(): AdminPageLanguageDto {
    const { title, url, previewImage, smallPreviewImage, widePreviewImage, metadata } = this;
    return {
      title,
      url,
      metadata,
      previewImageId: previewImage?.value ?? undefined,
      widePreviewImageId: widePreviewImage?.value ?? undefined,
      smallPreviewImageId: smallPreviewImage?.value ?? undefined,
      pageData: {
        rows: this.rows.map((r) => r.serialize()),
      },
    };
  }
}

const PageItems = [
  { id: "0", name: "Page" },
  { id: "1", name: "BlogEntry" },
  { id: "2", name: "UserReview" },
];

export class PageEditorStore extends RequestTracking {}
