import { RequestTracking } from "src/utils/Loadable";
import { AdminApi } from "src/clients/adminApiClient";
import { action, observable } from "mobx";
import { RootStore } from "src/stores/RootStore";
import {
  GlobalSettingsDto,
  LinkDto,
  SocialLinkDto,
  LinkListDto,
  ContactLinkDto,
} from "src/interfaces/GlobalSettingsDto";

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

  constructor(public rootStore: RootStore) {
    super();
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
}
