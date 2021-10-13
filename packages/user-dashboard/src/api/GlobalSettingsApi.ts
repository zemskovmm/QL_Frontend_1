import { jsonToUrlParam, request } from "./QLBaseApi";
import { GlobalSettingsDto } from 'admin-app/src/interfaces/GlobalSettingsDto'

export class GlobalSettingsApi {
    getGlobalSettings = async (lang: string) => 
        request<GlobalSettingsDto>(`global/ql/${lang}`, null, "GET");
}

export const globalSettingsApi = new GlobalSettingsApi();