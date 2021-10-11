

type RouteTemplateGetProps = {
    lang?:string;
    pageId?:string;
}

class RouteTemplate {
    readonly secure: boolean;
    private page: string;
    private pageId: string;
    private regex: RegExp;

    constructor(secure:boolean, page:string, pageId:string=""){
        this.secure = secure;
        this.page = page;
        this.pageId = pageId;
        AllRoutes[page] = this;
        
        let regex = `/\\w+${page}` + (pageId ? `(/${pageId})$` : '$');
        this.regex = new RegExp(regex)

    }

    get route(){ return `/:lang${this.page}${this.pageId}`} 

    isUrl(url:string):boolean{
        return this.regex.test(url);
    }

    getRoute({lang="en",pageId=""}:RouteTemplateGetProps={}){
        return `/${lang}${this.page}${pageId?"/"+pageId:""}`
    }
}

const AllRoutes:{[key:string]:RouteTemplate} = {}

export const getRouteTemplate = (url:string): RouteTemplate|undefined =>{
    const keys = Object.keys(AllRoutes);
    for(const next of keys){
        if(AllRoutes[next].isUrl(url)){
            return AllRoutes[next];
        }
    }
}
export const isSecureUrl = (url:string): boolean =>{
    const template = getRouteTemplate(url)
    if( template ){
        return template.secure;
    }
    return false;
}

export const HOME_ROUTE = new RouteTemplate(false,"/");
export const SIGN_UP_ROUTE = new RouteTemplate(false,"/sign-up");
export const SIGN_IN_ROUTE = new RouteTemplate(false,"/sign-in");

export const PERSONAL_ROUTE = new RouteTemplate(true,"/personal");
export const PROFILE_ROUTE = new RouteTemplate(true,"/profile");
