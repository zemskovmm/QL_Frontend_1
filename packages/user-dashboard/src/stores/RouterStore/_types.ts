type RouteTemplateGetProps = {
    lang:string;
    params?:Array<string>;
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
        
        const regex = '^'+this.path.replace(/:\w+/g,'\\w+')+'/?$'
        this.regex = new RegExp(regex);
    }

    get path(){ return `/:lang${this.page}${this.pageId}`} 

    isUrl(url:string):boolean{
        return this.regex.test(url);
    }

    getRoute({lang, params=[] }:RouteTemplateGetProps){
        return `/${lang}${this.page}${params?"/"+params.join('/'):""}`
    }
}

export type PagePaths = {
    HOME_PATH: string;
    SIGN_UP_PATH: string;
    SIGN_IN_PATH: string;

    PROFILE_PATH: string;
    SETTINGS_PATH: string;
    NEW_APPLICATION_PATH: string;
}