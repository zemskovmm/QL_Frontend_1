import { List, ListItemType } from "@project/components/src/ui-kit/List";
import { FunctionalComponent } from "preact";
import { memo } from "preact/compat";
import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import { useLocalesStore } from "stores/LocalesStore";
import { MY_APPLICATIONS_TEMPLATE, useRouterStore } from "stores/RouterStore";

import { TOTAL_APPLICATIONS, useApplicationsState } from "stores/ApplicationsState";

type PropsType = {
    className?: string;
}

export const LeftNavigation: FunctionalComponent<PropsType> = memo(({className}) => {
    const {
        PROFILE_PATH,
        SETTINGS_PATH,
    } = useRouterStore();

    const {lang,
        PROFILE_LANG,
        MY_APPLICATIONS_LANG,
        SETTINGS_LANG,
    } = useLocalesStore();

    const {applications, getApplications} = useApplicationsState();

    useEffect(()=>{
        getApplications({
            page:0, 
            pageSize:TOTAL_APPLICATIONS,
            type: "",
            status: "",
        })
    },[])

    const myApplicationsList:Array<ListItemType> = applications.map(({id,type,status})=>(
        {depth:1, id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:id.toString()}), text:`${id}${type} ${status}` }
    ));

    const items:Array<ListItemType> = [
        {depth:0, id:PROFILE_PATH, text:PROFILE_LANG },
        {depth:0, id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:"0"}), text:MY_APPLICATIONS_LANG},
        ...myApplicationsList,
        {depth:0, id:SETTINGS_PATH, text:SETTINGS_LANG },
    ]

    const handleClick = (id:string) => {
        route(id);
    }

    return (
        <List className={className} items={items} onClick={handleClick}/>
    );
});