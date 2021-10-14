type RouteTemplateGetProps = {
    lang:string;
    pageId?:string;
}

export class RouteTemplate {
    readonly secure: boolean;
    private page: string;
    private pageId: string;
    private regex: RegExp;

    constructor(secure:boolean, page:string, pageId:string){
        this.secure = secure;
        this.page = page;
        this.pageId = pageId;
        
        let regex = `/\\w+${page}` + (pageId ? `/\\w+$` : '$');
        this.regex = new RegExp(regex);
    }

    get path(){ return `/:lang${this.page}${this.pageId}`} 

    isUrl(url:string):boolean{
        return this.regex.test(url);
    }

    getRoute({lang, pageId="" }:RouteTemplateGetProps){
        return `/${lang}${this.page}${pageId?"/"+pageId:""}`
    }
}

export type PagePaths = {
    HOME_PATH: string;
    SIGN_UP_PATH: string;
    SIGN_IN_PATH: string;

    PROFILE_PATH: string;
    SETTINGS_TEMPLATE: string;
}