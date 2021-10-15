import { Text } from "@project/components/src/ui-kit/Text";
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
        SETTINGS_TEMPLATE,
    } = useRouterStore();

    const {lang,translate:{
        profile,
        myApplications,
        application,
        settings,
    }} = useLocalesStore();

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
        {id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:id.toString()}), text:`${id}${type} ${status}` }
    ));

    const items:Array<ListItemType> = [
        {id:PROFILE_PATH, text:profile },
        {id:MY_APPLICATIONS_TEMPLATE.getRoute({lang,pageId:"0"}), text:myApplications, list: myApplicationsList },
        {id:SETTINGS_TEMPLATE, text:settings },
    ]

    const handleClick = (id:string) => {
        route(id);
    }

    return (
        <List className={className} items={items} onClick={handleClick}/>
    );
});