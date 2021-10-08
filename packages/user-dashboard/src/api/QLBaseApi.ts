import { ApiClientBase, QLRequest } from "@project/components/src/api/apiClientBase";

const apiClientBase = new ApiClientBase();

type ResType = {
    readonly isOk: boolean;
    readonly status: number;
    readonly url: string;
    readonly requestMethod: string;
    readonly error:string;
};

type UnSubscriberType = ()=>void;
type SubscriberType = (res:ResType)=>void;

const events={
    onResponseList: new Array<SubscriberType>()
};

export const jsonToUrlParam = (path:string, data:any):string => {
    const param = Object.keys(data)
        .filter(key=>{
            const value = data[key];
            const t = typeof value
            return (t==="string" && value.length) 
                || t==="number" 
                || t==="bigint" 
                || t==="boolean" 
        })
        .map(key=>`${key}=${data[key]}`)
        .join("&")

    return encodeURI(`${path}?${param}`)
}

export const onResponse = (subscribe:SubscriberType): UnSubscriberType => {
    events.onResponseList.push(subscribe)
    return ()=>{
        events.onResponseList = events.onResponseList.filter(s => s != subscribe);
    }
}

export const request = async <T>(path: string, data?: any, method?: string, formData?: boolean): Promise< QLRequest<T>> => {
    const result = await apiClientBase.request<T>(path,data,method,formData);
    events.onResponseList.forEach( event => event(result) );
    return result;
}