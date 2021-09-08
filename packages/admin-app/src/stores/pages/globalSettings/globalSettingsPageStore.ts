import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import { GlobalSettingsDto, LinkDto, SocialLinkDto, LinkListDto } from "src/interfaces/GlobalSettingsDto";
import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import { stateToHTML } from "draft-js-export-html";

export class GlobalSettingsPageStore extends RequestTracking {
  @observable headerTopLink: LinkDto[] = [];
  @observable headerSocialLink: SocialLinkDto[] = [];
  @observable headerBottomLink: LinkDto[] = [];

  @observable footerTopLink: LinkDto[] = [];
  @observable footerLinkList: LinkListDto[] = [];
  @observable.ref footerContactText: EditorState = EditorState.createWithContent(stateFromHTML(""));
  @observable footerSocialLink: SocialLinkDto[] = [];

  @observable requestFormTitle: string = "";
  @observable requestFormLeftTitle: string = "";
  @observable requestFormRightTitle: string = "";
  @observable.ref requestFormPostScriptText: EditorState = EditorState.createWithContent(stateFromHTML(""));

  @observable alert: boolean = false;
  @observable buttonDisabled: boolean = false;

  constructor(public rootStore: RootStore) {
    super();
  }

  @action resetState() {
    this.headerTopLink = [];
    this.headerSocialLink = [];
    this.headerBottomLink = [];
    this.footerTopLink = [];
    this.footerLinkList = [];
    this.footerContactText = EditorState.createWithContent(stateFromHTML(""));
    this.footerSocialLink = [];
    this.requestFormTitle = "";
    this.requestFormLeftTitle = "";
    this.requestFormRightTitle = "";
    this.requestFormPostScriptText = EditorState.createWithContent(stateFromHTML(""));
  }

  @action async load(lang: string) {
    this.resetState();
    try {
      const req: GlobalSettingsDto = await this.track(() => AdminApi.getGlobalSettings(lang));
      this.headerTopLink = req.header.headerTopLink ?? [];
      this.headerSocialLink = req.header.headerSocialLink ?? [];
      this.headerBottomLink = req.header.headerBottomLink ?? [];
      this.footerTopLink = req.footer.footerTopLink ?? [];
      this.footerLinkList = req.footer.footerLinkList ?? [];
      this.footerContactText = EditorState.createWithContent(stateFromHTML(req.footer.footerContactText));
      this.footerSocialLink = req.footer.footerSocialLink ?? [];
      this.requestFormTitle = req.requestForm.requestFormTitle;
      this.requestFormLeftTitle = req.requestForm.requestFormLeftTitle;
      this.requestFormRightTitle = req.requestForm.requestFormRightTitle;
      this.requestFormPostScriptText = EditorState.createWithContent(
        stateFromHTML(req.requestForm.requestFormPostScriptText)
      );
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
        requestFormPostScriptText: stateToHTML(this.requestFormPostScriptText.getCurrentContent()),
      },
      footer: {
        footerTopLink: this.footerTopLink,
        footerLinkList: this.footerLinkList,
        footerContactText: stateToHTML(this.footerContactText.getCurrentContent()),
        footerSocialLink: this.footerSocialLink,
      },
    };
    try {
      await this.track(() => AdminApi.putGlobalSettings("en", data));
      this.alert = true;
    } catch (e) {
      alert(e);
    }

    this.buttonDisabled = false;
  }
}
