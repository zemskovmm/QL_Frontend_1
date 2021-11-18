import { NEW_APPLICATION_TEMPLATE, SETTINGS_TEMPLATE } from ".";
import { 
    HOME_TEMPLATE, 
    PROFILE_TEMPLATE, 
    SIGN_IN_TEMPLATE, 
    SIGN_UP_TEMPLATE 
} from "./_constants";
import { PagePaths, RouteTemplate } from "./_types";

const AllRoutes:{[key:string]:RouteTemplate} = {}

export const secureRoute=(page:string, pageId:string="")=>{
    const template = new RouteTemplate(true, page, pageId)
    AllRoutes[template.path.replace(/:\w+/g,':w')] = template;
    return template;
}

export const publicRoute=(page:string, pageId:string="")=>{
    const template = new RouteTemplate(false, page, pageId)
    AllRoutes[template.path.replace(/:\w+/g,':w')] = template;
    return template;
}

export const getRouteTemplate = (url:string): RouteTemplate|undefined =>{
    const keys = Object.keys(AllRoutes);
    for(const next of keys){
        if(AllRoutes[next].isUrl(url)){
            console.log(next)
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

export const getLangPagePaths = (lang:string):PagePaths => {
    return {
        HOME_PATH: HOME_TEMPLATE.getRoute({lang}),
        SIGN_UP_PATH: SIGN_UP_TEMPLATE.getRoute({lang}),
        SIGN_IN_PATH: SIGN_IN_TEMPLATE.getRoute({lang}),

        PROFILE_PATH: PROFILE_TEMPLATE.getRoute({lang}),
        SETTINGS_PATH: SETTINGS_TEMPLATE.getRoute({lang}),
        NEW_APPLICATION_PATH: NEW_APPLICATION_TEMPLATE.getRoute({lang}),
    }
}
